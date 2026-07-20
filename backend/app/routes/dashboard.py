
from fastapi import APIRouter

from app.database import SessionLocal
from app.models.oportunidade import Oportunidade
from app.services.scheduler import scheduler



router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)



@router.get("")
def dashboard():


    db = SessionLocal()


    try:

        oportunidades = (
            db.query(Oportunidade)
            .all()
        )


        total_oportunidades = len(
            oportunidades
        )


        lucro_total = sum(
            item.lucro
            for item in oportunidades
        )


        investimento_total = sum(
            item.investimento
            for item in oportunidades
        )


        melhor_lucro = max(
            [
                item.lucro_percentual
                for item in oportunidades
            ],
            default=0
        )



        return {

            "scanner_online":
                scheduler.running,


            "ultima_execucao":
                scheduler.status().get(
                    "ultima_execucao"
                ),


            "odds_analisadas":
                scheduler.status().get(
                    "odds_analisadas"
                ),


            "surebets_encontradas":
                scheduler.status().get(
                    "surebets_encontradas"
                ),


            "total_oportunidades_salvas":
                total_oportunidades,


            "investimento_total":
                investimento_total,


            "lucro_total":
                lucro_total,


            "melhor_lucro_percentual":
                melhor_lucro

        }


    finally:

        db.close()