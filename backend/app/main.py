from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


from app.routes.dashboard import router as dashboard_router
from app.routes.status import router as status_router
from app.routes.sports import router as sports_router
from app.routes.scanner import router as scanner_router
from app.routes.oportunidades import router as oportunidades_router
from app.routes.scheduler import router as scheduler_router

from app.services.scheduler import scheduler
from app.database import engine, Base
from app.models import oportunidade, aposta, usuario
from app.routes.config import router as config_router



Base.metadata.create_all(bind=engine)


app = FastAPI(

    title="SureBetWeb API",

    version="1.0.0",

    description="Sistema inteligente para análise de Surebets"

)






# =====================================
# CORS - PERMITIR FRONTEND REACT
# =====================================


app.add_middleware(


    CORSMiddleware,


    allow_origins=[


         "http://localhost:5173",

         "http://127.0.0.1:5173",

         "http://192.168.0.14:5173"


    ],


    allow_credentials=True,


    allow_methods=["*"],


    allow_headers=["*"],


)







@app.on_event("startup")
def iniciar_sistema():


    print("Iniciando Scheduler SureBetWeb...")


    scheduler.iniciar()







@app.on_event("shutdown")
def desligar_sistema():


    print("Desligando Scheduler...")


    scheduler.parar()







@app.get("/")
def root():


    return {


        "name": "SureBetWeb API",


        "version": "1.0.0",


        "status": "online"


    }







# =====================================
# ROTAS DO SISTEMA
# =====================================


app.include_router(status_router)


app.include_router(sports_router)


app.include_router(scanner_router)


app.include_router(oportunidades_router)


app.include_router(scheduler_router)


app.include_router(dashboard_router)

app.include_router(config_router)