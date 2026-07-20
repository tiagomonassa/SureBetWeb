from fastapi import APIRouter

from app.services.scheduler import scheduler



router = APIRouter(
    prefix="/scheduler",
    tags=["Scheduler"]
)



@router.get("/status")
def status_scheduler():

    return scheduler.status()



@router.get("/executar")
def executar_scheduler():

    scheduler.executar_scan()

    return {
        "status": "ok",
        "mensagem": "Scanner executado manualmente"
    }