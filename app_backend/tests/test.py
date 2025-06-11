from app.services.remote_api_call import RemoteAPICall

PORT = 5000
API_URL = f"http://localhost:{PORT}"

if __name__ == "__main__":
    remote = RemoteAPICall(api_url=API_URL) 
    print(f"Testing API at: {remote.api_url}")
    print(f"Health check result: {remote.health_check()}")