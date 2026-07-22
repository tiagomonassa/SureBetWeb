import "./SurebetModal.css";

import { obterLinkBookmaker } from "../../utils/bookmakerLinks";

import { useSurebets } from "../../context/SurebetContext";



function SurebetModal({ oportunidade, onClose }) {


    const { banca } = useSurebets();



    if (!oportunidade) return null;





    const formatarMoeda = (valor) =>

        Number(valor || 0).toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );








    function calcularDistribuicao(apostas){


        const soma = apostas.reduce(

            (total, aposta)=>

                total +

                (

                    1 /

                    Number(aposta.odd)

                ),

            0

        );





        return apostas.map(aposta=>{


            const valor =

                Number(banca) *

                (

                    (

                        1 /

                        Number(aposta.odd)

                    )

                    /

                    soma

                );





            const retorno =

                valor *

                Number(aposta.odd);





            return {

                ...aposta,

                valor_aposta:valor,

                retorno:retorno

            };


        });


    }









    const apostasCalculadas = calcularDistribuicao(

        oportunidade.apostas || []

    );







    const somaOdds = (

        oportunidade.apostas || []

    ).reduce(

        (total, aposta)=>

            total +

            (

                1 /

                Number(aposta.odd)

            ),

        0

    );







    const retornoFinal =

        Number(banca) /

        somaOdds;






    const lucro =

        retornoFinal -

        Number(banca);








    function nomeSelecao(aposta){



        if(

            oportunidade.mercado === "totals"

            &&

            oportunidade.linha !== null

            &&

            oportunidade.linha !== undefined

        ){



            if(aposta.selecao === "Over"){

                return (

                    `Mais de ${oportunidade.linha} gols`

                );

            }




            if(aposta.selecao === "Under"){

                return (

                    `Menos de ${oportunidade.linha} gols`

                );

            }


        }




        return aposta.selecao;


    }









    function formatarDataEvento(){



        if(!oportunidade.data_evento){

            return "--";

        }




        return new Date(

            oportunidade.data_evento

        ).toLocaleString(

            "pt-BR",

            {

                timeZone:"America/Sao_Paulo"

            }

        );


    }









    return (



<div

className="modal-overlay"

onClick={onClose}

>



<div

className="surebet-modal"

onClick={(e)=>e.stopPropagation()}

>







<div className="modal-header">


<div>


<h2>

{oportunidade.evento}

</h2>




<span>

📅 {formatarDataEvento()}

</span>




<span>

{oportunidade.mercado}

{

oportunidade.linha !== null

&&

oportunidade.linha !== undefined

?

` • Linha ${oportunidade.linha}`

:

""

}

</span>



</div>




<button

className="modal-close"

onClick={onClose}

>

✕

</button>



</div>









<div className="modal-body">



{

apostasCalculadas.map((aposta)=>(



<div

className="bet-card"

key={aposta.id}

>





<div className="bet-house">



<a

href={obterLinkBookmaker(aposta.casa) || "#"}

target="_blank"

rel="noopener noreferrer"

onClick={(e)=>e.stopPropagation()}

>

🟢 {aposta.casa} ↗

</a>



</div>






{

obterLinkBookmaker(aposta.casa)

&&



<button

className="modal-open-btn"

onClick={()=>{


window.open(

obterLinkBookmaker(aposta.casa),

"_blank"

);


}}

>

Abrir Casa ↗

</button>



}







<div className="bet-info">

    <div>

        <span>Casa</span>

        <strong>{aposta.casa}</strong>

    </div>

    <div>

        <span>Seleção</span>

        <strong>{nomeSelecao(aposta)}</strong>

    </div>

    <div>

        <span>Odd</span>

        <strong>{aposta.odd}</strong>

    </div>

</div>





</div>



))


}



</div>









<div className="modal-footer">





<div className="footer-card">


<span>

Investimento

</span>


<strong>

{formatarMoeda(banca)}

</strong>


</div>









<div className="footer-card">


<span>

Retorno

</span>


<strong>

{formatarMoeda(retornoFinal)}

</strong>


</div>









<div className="footer-card lucro">


<span>

Lucro

</span>


<strong>

{formatarMoeda(lucro)}

</strong>



<small>

+

{

(

(lucro / Number(banca))

*

100

).toFixed(2)

}%

</small>


</div>






</div>








</div>






</div>



);


}





export default SurebetModal;