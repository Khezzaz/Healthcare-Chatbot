# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import llm_route

app = FastAPI()

# Autoriser les origines (comme ton frontend en dev)
origins = [
    "http://localhost:8080",  # l'adresse de ton frontend React/Vite
]

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # autoriser cette origine
    allow_credentials=True,         # autoriser l'envoi de cookies/headers d'auth
    allow_methods=["*"],            # autoriser toutes les méthodes HTTP
    allow_headers=["*"],            # autoriser tous les headers (ex : Content-Type)
)

# Inclure le routeur sans redéfinir le préfixe (déjà fait dans llm_route.py)
app.include_router(llm_route.router)
