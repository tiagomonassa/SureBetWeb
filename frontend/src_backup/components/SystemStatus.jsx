import { useEffect, useState } from "react";

import "./SystemStatus.css";


function SystemStatus() {


  const [apiOnline, setApiOnline] = useState(false);

  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);



  useEffect(() => {


    function verificarAPI() {


      fetch("http://127.0.0.1:8000/")

        .then(() => {

          setApiOnline(true);

          setUltimaAtualizacao(new Date());

        })


        .catch(() => {

          setApiOnline(false);

        });


    }



    verificarAPI();



    const intervalo = setInterval(() => {

      verificarAPI();

    }, 5000);



    return () => clearInterval(intervalo);



  }, []);





  function mostrarHora() {


    if (!ultimaAtualizacao) {

      return "--:--:--";

    }


    return ultimaAtualizacao.toLocaleTimeString();

  }





  return (

    <div className="system-wrapper">


      <div className="system-status">


        <div className="status-item">


          <span

            className={
              apiOnline
                ? "system-status-dot system-status-online"
                : "system-status-dot system-status-offline"
            }

          ></span>


          API {apiOnline ? "Online" : "Offline"}


        </div>





        <div className="status-item">


          <span className="system-status-dot system-status-online"></span>


          Banco de Dados


        </div>





        <div className="status-item">


          <span className="system-status-dot system-status-online"></span>


          Scanner Ativo


        </div>




      </div>





      <div className="sync-time">


        Última sincronização: {mostrarHora()}


      </div>




    </div>

  );

}


export default SystemStatus;