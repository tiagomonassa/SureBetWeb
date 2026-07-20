import { useEffect, useState } from "react";

import { getOdds } from "../services/api";

import OddsComparator from "../components/OddsComparator/OddsComparator";

import "./Odds.css";



function Odds(){



const [odds,setOdds] = useState([]);

const [carregando,setCarregando] = useState(true);





async function carregarOdds(){


try{


const dados = await getOdds();


setOdds(dados);



}catch(error){


console.error(
"Erro ao carregar odds:",
error
);



}

finally{


setCarregando(false);


}



}






useEffect(()=>{


carregarOdds();



const intervalo =
setInterval(
carregarOdds,
15000
);



return ()=>clearInterval(intervalo);



},[]);






return(


<div className="odds-page">





<div className="odds-header">


<h2>
📡 Odds Reais
</h2>


<span>

{odds.length}

jogos encontrados

</span>


</div>







{
carregando &&

<div className="loading">

Carregando odds...

</div>

}







{
!carregando &&
odds.length === 0 &&


<div className="empty">


Nenhuma odd encontrada.


</div>


}







<div className="odds-grid">



{
odds.map(
(jogo,index)=>(


<div

className="odd-card"

key={index}

>


<div className="odd-title">

Evento

</div>


<strong>

{jogo.evento}

</strong>





<div className="odd-info">


<span>
Casa
</span>


<b>
{jogo.casa}
</b>


</div>






<div className="odd-info">


<span>
Mercado
</span>


<b>
{jogo.mercado}
</b>


</div>




</div>


)

)

}



</div>







<OddsComparator odds={odds}/>





</div>


);


}



export default Odds;