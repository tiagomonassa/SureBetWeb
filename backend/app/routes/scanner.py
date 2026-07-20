from fastapi import APIRouter

from app.services.scanner_service import scanner_service


router = APIRouter(
    prefix="/scanner",
    tags=["Scanner"]
)



@router.get("/")
def executar_scanner():

    resultado = scanner_service.executar_scan(
        sport_key="soccer_epl",
        lucro_minimo=0.5,
        valor_total=1000
    )

    return resultado



@router.post("/executar")
def executar_scanner_manual():

    resultado = scanner_service.executar_scan(
        sport_key="soccer_epl",
        lucro_minimo=0.5,
        valor_total=1000
    )


    return {

        "status": "ok",

        "mensagem": "Scanner executado manualmente",

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