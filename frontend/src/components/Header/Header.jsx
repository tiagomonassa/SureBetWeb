import {
  useEffect,
  useState
} from "react";


import "./Header.css";


import { statusAPI } from "../../services/api";

import { useSurebets } from "../../context/SurebetContext";



function Header() {


  const {

    atualizar,

    ultimaAtualizacao,

    novasSurebets,

    carregando


  } = useSurebets();





  const [status, setStatus] = useState("offline");


  const [segundos, setSegundos] = useState(0);






  async function verificarAPI() {


    try {


      const resposta = await statusAPI();
      console.log("STATUS RECEBIDO:", resposta);



      setStatus(

        resposta.api === "online"

    ?

    "online"

    :

    "offline"

      );



    } catch {


      setStatus("offline");


    }


  }







  /*
    CONTADOR DESDE A ÚLTIMA ATUALIZAÇÃO
  */


  useEffect(() => {


    const contador = setInterval(() => {



      if (ultimaAtualizacao) {


        const agora = new Date();



        const diferenca = Math.floor(

          (agora - ultimaAtualizacao) / 1000

        );



        setSegundos(diferenca);


      }



    },1000);



    return () => clearInterval(contador);



  },[ultimaAtualizacao]);








  /*
    STATUS DA API
  */


  useEffect(() => {


    verificarAPI();



    const timer = setInterval(

      verificarAPI,

      30000

    );



    return () => clearInterval(timer);



  },[]);








  return (


    <header className="header">





      <div className="logo-area">


        <div className="logo">


          🎯 SureBet<span>Web</span>


        </div>





        <div className={`status ${status}`}>


          <span className="dot"></span>


          {


            status === "online"

            ?

            "API Online"

            :

            "API Offline"


          }


        </div>



      </div>








      <div className="header-right">





        <div className="header-info">


          🕒


          <span>


            Atualizado há {segundos}s


          </span>


        </div>








        <div className="header-info success">


          ✨


          <span>


            {novasSurebets} nova(s)


          </span>


        </div>








        <button


          className="btn-refresh"


          onClick={atualizar}


          disabled={carregando}


        >


          {


            carregando

            ?

            "Atualizando..."

            :

            "Atualizar"


          }


        </button>





      </div>





    </header>


  );


}


export default Header;