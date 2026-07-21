from fastapi import APIRouter

from app.database import SessionLocal

from app.crud import listar_oportunidades

from app.models.configuracao import Configuracao



router = APIRouter(
    prefix="/oportunidades",
    tags=["Oportunidades"]
)



@router.get("")
def obter_oportunidades():

    db = SessionLocal()


    try:


        dados = listar_oportunidades(db)



        configuracao = (
            db.query(Configuracao)
            .first()
        )


        valor_total = (

            configuracao.valor_total

            if configuracao

            else 1000

        )



        resultado = []



        for item in dados:


            apostas = []



            for aposta in item.apostas:


                apostas.append({

                    "id": aposta.id,

                    "casa": aposta.casa,

                    "selecao": aposta.selecao,

                    "odd": aposta.odd,

                    "valor_aposta": aposta.valor_aposta,

                    "retorno": aposta.retorno

                })




            lucro_percentual = float(
                item.lucro_percentual or 0
            )



            resultado.append({


                "id": item.id,


                "evento": item.evento,


                "mercado": item.mercado,


                "linha": getattr(
                    item,
                    "linha",
                    None
                ),


                "lucro_percentual": lucro_percentual,



                "investimento":

                    valor_total,



                "retorno_final":

                    valor_total +

                    (
                        valor_total *
                        lucro_percentual /
                        100
                    ),



                "lucro":

                    valor_total *
                    lucro_percentual /
                    100,



                "data_criacao":

                    item.data_criacao,



                "data_evento":

                    (
                        item.data_evento.isoformat() + "Z"

                        if item.data_evento

                        else None

                    ),



                "apostas": apostas


            })



        return resultado



    finally:

        db.close()