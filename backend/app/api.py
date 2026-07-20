import requests

from app.config import settings


# =====================================
# THE ODDS API
# =====================================

BASE_URL = "https://api.the-odds-api.com/v4"



class OddsAPI:


    def __init__(self):

        self.api_key = settings.ODDS_API_KEY



    # =====================================
    # LISTAR ESPORTES
    # =====================================

    def get_sports(self):

        """
        Retorna todos os esportes disponíveis.
        """


        url = f"{BASE_URL}/sports"


        params = {

            "apiKey": self.api_key

        }



        response = requests.get(

            url,

            params=params,

            timeout=30

        )



        if response.status_code != 200:

            print(response.text)



        response.raise_for_status()



        return response.json()






    # =====================================
    # BUSCAR ODDS
    # =====================================

    def get_odds(

        self,

        sport_key,

        regions=None,

        markets=None

    ):

        """
        Retorna as odds de um esporte.
        """



        url = (

            f"{BASE_URL}/sports/"

            f"{sport_key}/odds"

        )




        params = {


            "apiKey":

                self.api_key,



            "regions":

                regions or settings.ODDS_REGION,



            "markets":

                markets or settings.ODDS_MARKETS,



            "oddsFormat":

                "decimal"

        }





        response = requests.get(

            url,

            params=params,

            timeout=30

        )





        # MOSTRA ERRO REAL DA THE ODDS API

        if response.status_code != 200:

            print(

                "ERRO THE ODDS API:",

                response.text

            )





        response.raise_for_status()



        return response.json()





# =====================================
# INSTÂNCIA GLOBAL
# =====================================

odds_api = OddsAPI()