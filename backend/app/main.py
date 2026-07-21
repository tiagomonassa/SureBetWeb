# ==========================================
# SUREBETWEB BACKEND
# FastAPI MAIN
# ==========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Rotas
from app.routes import router


# ==========================================
# CRIAÇÃO DO BANCO
# ==========================================

Base.metadata.create_all(bind=engine)



# ==========================================
# FASTAPI
# ==========================================

app = FastAPI(
    title="SureBetWeb API",
    version="1.0.0"
)



# ==========================================
# CORS
# Frontend Render + Desenvolvimento Local
# ==========================================

origins = [

    # Frontend publicado
    "https://surebetweb.onrender.com",

    # Ambiente local Vite
    "http://localhost:5173",
    "http://127.0.0.1:5173"

]


app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)



# ==========================================
# ROTAS PRINCIPAIS
# ==========================================

app.include_router(router)



# ==========================================
# STATUS API
# ==========================================

@app.get("/status")
def status():

    return {

        "status": "online",

        "service": "SureBetWeb API"

    }



# ==========================================
# ROOT
# ==========================================

@app.get("/")
def home():

    return {

        "message": "SureBetWeb API funcionando"

    }