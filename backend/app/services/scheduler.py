from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler

from app.services.scanner_service import scanner_service

from app.config.scanner_config import SCANNER_CONFIG



class SchedulerService:


    def __init__(self):

        self.scheduler = BackgroundScheduler()


        self.intervalo_minutos = SCANNER_CONFIG[
            "intervalo_minutos"
        ]


        self.ultima_execucao = None

        self.status_execucao = "aguardando"

        self.odds_analisadas = 0

        self.surebets_encontradas = 0

        self.ultimo_erro = None



    def iniciar(self):

        if self.scheduler.running:

            return



        self.scheduler.add_job(

            self.executar_scan,

            "interval",

            minutes=self.intervalo_minutos,

            id="surebet_scanner",

            replace_existing=True

        )



        self.scheduler.start()



        print(
            f"Scheduler iniciado - intervalo {self.intervalo_minutos} minutos"
        )




    def executar_scan(self):

        inicio = datetime.now()



        try:


            resultado = scanner_service.executar_scan()



            self.ultima_execucao = inicio


            self.status_execucao = "ok"



            self.odds_analisadas = resultado.get(

                "odds_analisadas",

                0

            )



            self.surebets_encontradas = resultado.get(

                "surebets_encontradas",

                0

            )



            self.ultimo_erro = None



            print(

                "SCAN AUTOMÁTICO:",

                self.surebets_encontradas,

                "surebets encontradas"

            )



        except Exception as erro:



            self.status_execucao = "erro"


            self.ultimo_erro = str(

                erro

            )



            print(

                "Erro no scanner automático:",

                erro

            )






    def status(self):


        return {


            "scheduler_rodando":

                self.scheduler.running,



            "intervalo_minutos":

                self.intervalo_minutos,



            "ultima_execucao":

                self.ultima_execucao.isoformat()

                if self.ultima_execucao

                else None,



            "status_execucao":

                self.status_execucao,



            "odds_analisadas":

                self.odds_analisadas,



            "surebets_encontradas":

                self.surebets_encontradas,



            "ultimo_erro":

                self.ultimo_erro

        }





    def parar(self):


        if self.scheduler.running:


            self.scheduler.shutdown()





    @property

    def running(self):

        return self.scheduler.running





scheduler = SchedulerService()