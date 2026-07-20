from app.api import odds_api

from app.services.market_config import obter_mercados_ativos



def importar_odds(
    sport_key="soccer_epl",
    markets=None
):
    """
    Busca odds na The Odds API
    e retorna dados normalizados.
    """



    if markets is None:

        mercados = obter_mercados_ativos()


    else:

        if isinstance(markets, str):

            mercados = markets.split(",")

        else:

            mercados = markets



    resultado_final = []



    for mercado in mercados:


        try:

            eventos = odds_api.get_odds(
                sport_key=sport_key,
                markets=mercado
            )


        except Exception as erro:

            print(
                f"Erro ao buscar mercado {mercado}: {erro}"
            )

            continue



        for evento in eventos:


            evento_nome = (
                f"{evento['home_team']} x "
                f"{evento['away_team']}"
            )



            for bookmaker in evento.get(
                "bookmakers",
                []
            ):


                casa = bookmaker.get(
                    "title"
                )



                for market in bookmaker.get(
                    "markets",
                    []
                ):



                    if market.get(
                        "key"
                    ) != mercado:

                        continue



                    for outcome in market.get(
                        "outcomes",
                        []
                    ):



                        resultado_final.append(

                            {

                                "event_id":
                                    evento.get(
                                        "id"
                                    ),


                                "sport_key":
                                    sport_key,


                                "evento":
                                    evento_nome,


                                "inicio":
                                    evento.get(
                                        "commence_time"
                                    ),


                                "mercado":
                                    mercado,


                                "linha":
                                    outcome.get(
                                        "point"
                                    ),


                                "selecao":
                                    outcome.get(
                                        "name"
                                    ),


                                "casa":
                                    casa,


                                "odd":
                                    outcome.get(
                                        "price"
                                    )

                            }

                        )



    return resultado_final