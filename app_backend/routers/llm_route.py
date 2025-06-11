# app/routers/llm_route.py

from fastapi import APIRouter, HTTPException, UploadFile, Form
from pydantic import BaseModel
from typing import Any, Dict, List, Optional
import os
import tempfile
import json

from services.gemini_service import GeminiService
from services.remote_inference import RemoteLLMService
from services.remote_api_call import RemoteAPICall
from dotenv import load_dotenv

load_dotenv()

NGROK_URL = os.getenv("NGROK_URL")
PDF_API_URL = "http://localhost:5000"

router = APIRouter(prefix="/llm", tags=["LLM"])

gemini_service = GeminiService()
remote_inference = RemoteLLMService(ngrok_url=NGROK_URL)
pdf_processor = RemoteAPICall(api_url=PDF_API_URL)  # Initialize PDF service

class GenerateRequest(BaseModel):
    message: str

class GenerateResponse(BaseModel):
    response: str

class PDFProcessResponse(BaseModel):
    response: str
    texte_nettoye: str
    visual_report: List[Any]
    filename: str
    question: Optional[str] = None

@router.post("/gemini/generate", response_model=GenerateResponse)
async def generate_gemini_response(
    uploaded_file: UploadFile
):
    try:
        response_text = gemini_service.generate(uploaded_file)
        return GenerateResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/gemini/generate-custom", response_model=GenerateResponse)
async def generate_gemini_response_custom(
    uploaded_file: UploadFile,
    message: str = Form(...)
):
    try:
        response_text = gemini_service.generate(uploaded_file, message)
        return GenerateResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/text_chat", response_model=GenerateResponse)
def generate(prompt: GenerateRequest):
    try:
        generate_text = remote_inference.generate(prompt.message)
        return GenerateResponse(response=generate_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/pdf_text_chat", response_model=PDFProcessResponse)
async def process_pdf_document(
    pdf_file: UploadFile,
    question: str = Form(default="")
):
    # Validate file type
    if not pdf_file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Ensure the file is not empty
    await pdf_file.seek(0)
    content_bytes = await pdf_file.read()
    if len(content_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")

    # Write uploaded PDF to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        temp_file_path = tmp.name
        tmp.write(content_bytes)

    try:
        # Call remote PDF-processing API
        raw_result: Dict[str, Any] = pdf_processor.process_pdf(
            pdf_file_path=temp_file_path,
            question=question
        )
        # raw_result is expected to be something like:
        # {
        #   "reponse": "{\n  \"reponse\": \"...\" }",
        #   "texte_nettoye": "...",
        #   "visual_report": [ ... ]
        # }

        # Decode the nested JSON string in raw_result["reponse"]
        try:
            nested = json.loads(raw_result.get("reponse", "{}"))
            final_response_text = nested.get("reponse", "")
        except json.JSONDecodeError:
            final_response_text = raw_result.get("reponse", "")

        return PDFProcessResponse(
            response=final_response_text,
            texte_nettoye=raw_result.get("texte_nettoye", ""),
            visual_report=raw_result.get("visual_report", []),
            filename=pdf_file.filename,
            question=question if question else None
        )

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Temporary file could not be created")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Validation error: {str(e)}")
    except Exception as e:
        if "API validation error" in str(e):
            raise HTTPException(status_code=400, detail=str(e))
        elif "API processing error" in str(e):
            raise HTTPException(status_code=502, detail=f"Remote processing failed: {str(e)}")
        elif "Network error" in str(e) or "Cannot connect" in str(e):
            raise HTTPException(status_code=503, detail=f"PDF processing service unavailable: {str(e)}")
        else:
            raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(temp_file_path):
            try:
                os.unlink(temp_file_path)
            except OSError:
                pass  # Ignore cleanup failure

@router.get("/pdf/health")
async def check_pdf_service_health():
    try:
        is_healthy = pdf_processor.health_check()
        return {
            "service": "PDF Processing API",
            "status": "healthy" if is_healthy else "unhealthy",
            "url": PDF_API_URL
        }
    except Exception as e:
        return {
            "service": "PDF Processing API",
            "status": "error",
            "error": str(e),
            "url": PDF_API_URL
        }
