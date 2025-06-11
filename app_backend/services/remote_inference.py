import requests

class RemoteLLMService:

    def __init__(self, ngrok_url):

        self.url = ngrok_url

    def generate(self, message: str):
        
        try:
            response = requests.post(f"{self.url}/generate", json={"message": message})

            response.raise_for_status()

            return response.json()["response"]
        
        except Exception as e:
            
            raise RuntimeError(f"Remote inference failed: {str(e)}")
