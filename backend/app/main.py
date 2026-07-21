# ==========================================
# SUREBETWEB BACKEND
# FastAPI MAIN
# ==========================================

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Rotas
from app.routes import router


# ==========================================
# BANCO + STARTUP
# ==========================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    print("===================================")
    print("SUREBETWEB API INICIANDO")
    print("===================================")

    try:

        Base.metadata.create_all(bind=engine)

        print("BANCO OK")

    except Exception as e:

        print("ERRO BANCO:", e)


    yield


    print("SUREBETWEB API FINALIZADA")



# ==========================================
# FASTAPI
# ==========================================

app = FastAPI(

    title="SureBetWeb API",

    version="1.0.0",

    lifespan=lifespan

)



# ==========================================
# CORS
# Frontend Render + Local
# ==========================================

origins = [

    "https://surebetweb.onrender.com",

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
# ROTAS
# ==========================================

app.include_router(router)



# ==========================================
# STATUS
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