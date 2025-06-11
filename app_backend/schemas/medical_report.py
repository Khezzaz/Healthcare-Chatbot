from pydantic import BaseModel

class MedicalReportCreate(BaseModel):
    filename: str
    parsed_text: str
    image_paths: str
