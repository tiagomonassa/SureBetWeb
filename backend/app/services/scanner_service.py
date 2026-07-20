from datetime import datetime

from app.services.odds_importer import importar_odds
from app.services.surebet_engine import encontrar_surebets

from app.database import SessionLocal

from app.crud import (
    criar_ou_atualizar_oportunidade,
    substituir_apostas
)

from app.config.scanner_config import SCANNER_CONFIG



class ScannerService:


    def __init__(self):

        self.ultima_execucao = None

        self.ultima_quantidade_odds = 0

        self.ultima_quantidade_surebets = 0

        self.ultimas_oportunidades = []



    def executar_scan(
        self,
        sport_key=None,
        lucro_minimo=None,
        valor_total=None
    ):


        if sport_key is None:

            sport_key = SCANNER_CONFIG["sport_key"]



        if lucro_minimo is None:

            lucro_minimo = SCANNER_CONFIG["lucro_minimo"]



        if valor_total is None:

            valor_total = SCANNER_CONFIG["valor_total"]



        inicio = datetime.now()



        # ============================
        # IMPORTA ODDS
        # ============================

        odds = importar_odds(

            sport_key=sport_key,

            markets=SCANNER_CONFIG["mercados"]

        )



        # ============================
        # ENCONTRA SUREBETS
        # ============================

        oportunidades = encontrar_surebets(

            odds,

            lucro_minimo=lucro_minimo,

            valor_total=valor_total

        )



        oportunidades_salvas = []



        # ============================
        # SALVA BANCO
        # ============================

        db = SessionLocal()


        try:


            for oportunidade in oportunidades:


                # --------------------------------
                # PROTEÇÃO:
                # Não salva oportunidade sem apostas
                # --------------------------------

                apostas = oportunidade.get(
                    "apostas",
                    []
                )


                if len(apostas) < 2:

                    continue



                nova_oportunidade = criar_ou_atualizar_oportunidade(

                    db,

                    oportunidade

                )
            


                substituir_apostas(

                    db,

                    nova_oportunidade.id,

                    apostas

                    )



                oportunidades_salvas.append(

                    {

                        "id":
                            nova_oportunidade.id,


                        "evento":
                            nova_oportunidade.evento,


                        "mercado":
                            nova_oportunidade.mercado,


                        "linha":
                            getattr(
                                nova_oportunidade,
                                "linha",
                                None
                            ),


                        "lucro_percentual":
                            getattr(
                                nova_oportunidade,
                                "lucro_percentual",
                                nova_oportunidade.lucro
                            ),


                        "investimento":
                            getattr(
                                nova_oportunidade,
                                "investimento",
                                getattr(
                                    nova_oportunidade,
                                    "valor_investido",
                                    0
                                )
                            ),


                        "retorno_final":
                            nova_oportunidade.retorno_final,


                        "lucro":
                            nova_oportunidade.lucro,


                        "apostas":
                            apostas

                    }

                )



        finally:

            db.close()



        # ============================
        # ATUALIZA STATUS
        # ============================

        self.ultima_execucao = inicio


        self.ultima_quantidade_odds = len(
            odds
        )


        self.ultima_quantidade_surebets = len(
            oportunidades_salvas
        )


        self.ultimas_oportunidades = oportunidades_salvas



        return {


            "status":
                "ok",



            "executado_em":
                inicio.isoformat(),



            "esporte":
                sport_key,



            "mercados_analisados":
                SCANNER_CONFIG["mercados"],



            "odds_analisadas":
                len(odds),



            "surebets_encontradas":
                len(oportunidades_salvas),



            "oportunidades":
                oportunidades_salvas

        }





    def status(self):


        return {


            "ultima_execucao":

                self.ultima_execucao.isoformat()

                if self.ultima_execucao

                else None,



            "odds_analisadas":

                self.ultima_quantidade_odds,



            "surebets_encontradas":

                self.ultima_quantidade_surebets,



            "rodando":

                self.ultima_execucao is not None

        }





scanner_service = ScannerService()