import { useState } from "react";

import { executarScannerManual } from "../../services/api";

import "./ScannerButton.css";



function ScannerButton({ atualizar }) {



  const [status, setStatus] = useState("");

  const [executando, setExecutando] = useState(false);






  async function executar() {



    try {



      setExecutando(true);



      setStatus(

        "🔎 Executando scanner..."

      );





      const resultado = await executarScannerManual();







      setStatus(


        resultado?.quantidade_encontrada !== undefined

        ?

        `${resultado.quantidade_encontrada} oportunidade(s) encontrada(s) | ${resultado.quantidade_salva} nova(s) salva(s)`

        :

        "Scanner concluído com sucesso"


      );







      if(atualizar){


        await atualizar();


      }







    } catch(error) {



      console.error(error);




      setStatus(

        "❌ Erro ao executar scanner"

      );



    }

    finally{


      setExecutando(false);


    }


  }







return (



<div className="scanner-box">





<button


className="scanner-button"



onClick={executar}



disabled={executando}



>



{

executando

?

"Analisando..."

:

"🔎 Scanner SureHunter"

}



</button>







{

status &&



<span className="scanner-message">


{status}


</span>



}




</div>



);



}



export default ScannerButton;