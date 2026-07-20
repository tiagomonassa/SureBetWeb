from collections import defaultdict




def calcular_distribuicao_apostas(
    opcoes,
    valor_total
):
    """
    Calcula quanto apostar em cada seleção
    para garantir retorno igual.
    """

    soma = 0


    for opcao in opcoes:

        soma += 1 / opcao["odd"]



    apostas = []



    for opcao in opcoes:


        valor = (

            valor_total *

            ((1 / opcao["odd"]) / soma)

        )



        retorno = (

            valor *

            opcao["odd"]

        )



        apostas.append(

            {

                **opcao,

                "valor_aposta": round(

                    valor,

                    2

                ),

                "retorno": round(

                    retorno,

                    2

                )

            }

        )





    retorno_final = (

        valor_total /

        soma

    )




    lucro = (

        retorno_final -

        valor_total

    )





    lucro_percentual = (

        lucro /

        valor_total

    ) * 100





    return {


        "investimento": round(

            valor_total,

            2

        ),


        "retorno_final": round(

            retorno_final,

            2

        ),



        "lucro": round(

            lucro,

            2

        ),



        "lucro_percentual": round(

            lucro_percentual,

            2

        ),



        "apostas": apostas


    }









def encontrar_surebets(
    odds,
    lucro_minimo=0,
    valor_total=1000
):

    """
    Procura oportunidades de surebet.
    
    valor_total agora vem da configuração
    do sistema.
    """



    grupos = defaultdict(list)





    for odd in odds:



        chave = (

            odd["event_id"],

            odd["mercado"],

            odd.get("linha")

        )



        grupos[chave].append(odd)







    oportunidades = []







    for chave, lista in grupos.items():



        melhores = {}






        for item in lista:



            selecao = item["selecao"]






            if (

                selecao not in melhores

                or

                item["odd"] >

                melhores[selecao]["odd"]

            ):


                melhores[selecao] = item








        opcoes = list(

            melhores.values()

        )







        if len(opcoes) < 2:

            continue








        resultado = calcular_distribuicao_apostas(

            opcoes,

            valor_total

        )









        if (

            resultado["lucro_percentual"]

            >=

            lucro_minimo

        ):



            oportunidades.append(

                {


                    "evento":

                        opcoes[0]["evento"],



                    "mercado":

                        opcoes[0]["mercado"],



                    "linha":

                        opcoes[0]["linha"],



                    "data_evento":

                        opcoes[0].get("inicio"),



                    **resultado


                }

            )








    return oportunidades