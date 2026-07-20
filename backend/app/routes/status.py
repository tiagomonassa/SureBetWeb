from fastapi import APIRouter
from sqlalchemy import text

from app.database import SessionLocal
from app.services.scheduler import scheduler


router = APIRouter(tags=["Status"])



@router.get("/status")
def status():


    # ==========================
    # BANCO DE DADOS
    # ==========================

    database = "offline"


    try:

        db = SessionLocal()

        db.execute(
            text("SELECT 1")
        )

        database = "online"


    except Exception as erro:

        print(
            "Erro banco:",
            erro
        )


    finally:

        try:
            db.close()

        except:
            pass



    # ==========================
    # SCANNER / SCHEDULER
    # ==========================

    scanner_status = (

        "online"

        if scheduler.running

        else

        "offline"

    )



    # ==========================
    # THE ODDS API
    # ==========================

    api_status = "online"


    try:

        from app.api import odds_api


        odds_api.get_sports()


        api_status = "online"


    except Exception as erro:

        print(
            "Erro The Odds API:",
            erro
        )



    return {

        "backend": "online",

        "scanner": scanner_status,

        "database": database,

        "api": api_status

    }