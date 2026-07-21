from fastapi import APIRouter

from app.services.scanner_service import scanner_service


router = APIRouter(
    prefix="/scanner",
    tags=["Scanner"]
)



@router.get("/")
def executar_scanner():

    resultado = scanner_service.executar_scan()

    return resultado



@router.post("/executar")
def executar_scanner_manual():

    resultado = scanner_service.executar_scan()


    return {

        "status": "ok",

        "mensagem": "Scanner executado manualmente",

        "valor_total_utilizado":
            resultado["valor_total_utilizado"],

        "odds_analisadas":
            resultado["odds_analisadas"],

        "surebets_encontradas":
            resultado["surebets_encontradas"],

        "oportunidades":
            resultado["oportunidades"]

    }



@router.get("/status")
def status_scanner():

    return scanner_service.status()