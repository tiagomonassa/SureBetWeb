from fastapi import APIRouter

from app.database import SessionLocal
from app.crud import listar_oportunidades


router = APIRouter(
    prefix="/oportunidades",
    tags=["Oportunidades"]
)


@router.get("")
def obter_oportunidades():

    db = SessionLocal()

    try:

        dados = listar_oportunidades(db)


        return [

            {
                "id": item.id,

                "evento": item.evento,

                "mercado": item.mercado,

                "linha": getattr(
                    item,
                    "linha",
                    None
                ),


                "lucro_percentual": getattr(
                    item,
                    "lucro_percentual",
                    item.lucro
                ),


                "investimento": getattr(
                    item,
                    "investimento",
                    getattr(
                        item,
                        "valor_investido",
                        0
                    )
                ),


                "retorno_final": item.retorno_final,


                "lucro": item.lucro,


                "data_criacao": getattr(
                    item,
                    "data_criacao",
                    getattr(
                        item,
                        "data",
                        None
                    )
                ),


                "data_evento": (
                    item.data_evento.isoformat() + "Z"
                    if item.data_evento
                    else None   
                
                ),


                "apostas": [

                    {
                        "id": aposta.id,

                        "casa": aposta.casa,

                        "selecao": aposta.selecao,

                        "odd": aposta.odd,

                        "valor_aposta": aposta.valor_aposta,

                        "retorno": aposta.retorno

                    }

                    for aposta in item.apostas

                ]

            }

            for item in dados

        ]


    finally:

        db.close()