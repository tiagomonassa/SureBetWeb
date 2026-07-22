# ==========================================
# SUREBETWEB BACKEND
# FASTAPI MAIN
# ==========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine


# Scheduler automático
from app.services.scheduler import scheduler


# Rotas individuais
from app.routes.status import router as status_router
from app.routes.dashboard import router as dashboard_router
from app.routes.oportunidades import router as oportunidades_router
from app.routes.scanner import router as scanner_router
from app.routes.sports import router as sports_router
from app.routes.config import router as config_router
from app.routes.auth import router as auth_router



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
# STARTUP
# Inicia Scanner Automático
# ==========================================

@app.on_event("startup")
def iniciar_sistema():

    print("Iniciando SureBetWeb...")

    try:

        scheduler.iniciar()

        print("Scanner automático iniciado")

    except Exception as erro:

        print(
            "Erro ao iniciar scheduler:",
            erro
        )



# ==========================================
# CORS
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
# REGISTRO DAS ROTAS
# ==========================================

app.include_router(status_router)

app.include_router(dashboard_router)

app.include_router(oportunidades_router)

app.include_router(scanner_router)

app.include_router(sports_router)

app.include_router(config_router)

app.include_router(auth_router)




# ==========================================
# ROOT
# ==========================================

@app.get("/")
def home():

    return {

        "message": "SureBetWeb API funcionando"

    }