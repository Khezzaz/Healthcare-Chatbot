import requests 
from typing import Dict, Any, Optional 
import os

class RemoteAPICall : 

    def __init__(self , api_url : str ): 

        self.api_url = api_url.strip("/")
        self.endpoint = f"{self.api_url}/process"
    


    def process_pdf(self , pdf_file_path : str , question : str = "")->Dict[str , Any] :
        
        if not os.path.exists(pdf_file_path) : 
            raise FileNotFoundError(f"PFD file not found.")
        
        if not pdf_file_path.lower().endswith("pdf") : 
            raise ValueError("File must be a pdf") 
        
        try : 

            with open(pdf_file_path , "rb") as pdf_file  : 

                files = {

                    'pdf_file': (
                        os.path.basename(pdf_file_path),  # filename
                        pdf_file,                         # file object
                        'application/pdf'                 # mime type
                    )
                }

                data = { 
                    "quetion" : question
                }

                response = requests.post(
                    url= self.endpoint , 
                    files = files , 
                    data = data , 
                    timeout=120
                )

            if response.status_code == 200:
                return response.json()
            
            elif response.status_code == 400:
                error_msg = response.text if response.text else "Bad request - invalid file or parameters"
                raise ValueError(f"API validation error: {error_msg}")
            
            elif response.status_code == 500:

                try:
                    error_data = response.json()
                    error_msg = error_data.get('error', 'Internal server error')

                except:
                    error_msg = "Internal server error"
                raise Exception(f"API processing error: {error_msg}")
            
            else:
                raise Exception(f"Unexpected API response: {response.status_code} - {response.text}")
        
        except requests.exceptions.Timeout:
            raise requests.RequestException("Request timed out - API took too long to respond")
        
        except requests.exceptions.ConnectionError:
            raise requests.RequestException(f"Cannot connect to API at {self.api_url}")
        
        except requests.exceptions.RequestException as e:
            raise requests.RequestException(f"Network error: {str(e)}")
    

    def health_check(self) -> bool : 

        try : 
            response = requests.get(url=self.api_url , timeout=60)
            return response.status_code < 500
        
        except : 
            return False


    
