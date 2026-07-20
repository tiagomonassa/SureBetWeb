import {
    useEffect,
    useState
} from "react";


import "./SurebetRow.css";
import { obterLinkBookmaker } from "../../utils/bookmakerLinks";
import { useSurebets } from "../../context/SurebetContext";



function SurebetRow({ oportunidade, onSelect }) {


    const [nova, setNova] = useState(false);





    useEffect(() => {


        if (!oportunidade) return;



        const data =

            oportunidade.data_criacao

            ||

            oportunidade.data;



        if (!data) return;



        const idade =

            Date.now()

            -

            new Date(data).getTime();



        if (idade < 30000) {


            setNova(true);



            const timer = setTimeout(()=>{


                setNova(false);



            },8000);



            return ()=>clearTimeout(timer);


        }



    },[oportunidade]);









    const apostas =

        Array.isArray(oportunidade?.apostas)

        ?

        oportunidade.apostas

        :

        [];










    function copiarApostas(e){

    e.stopPropagation();


    const texto = `

🏆 Jogo: ${oportunidade.evento || ""}


📊 Mercado: ${nomeMercado()}


${apostas.map(aposta => `

🏠 Casa: ${aposta.casa || "Casa"}

🎯 Seleção: ${nomeSelecao(aposta)}

💰 Odd: ${aposta.odd || ""}

💵 Valor: R$ ${
    Number(aposta.valor_aposta || 0)
    .toFixed(2)
}


🔗 Link:
${obterLinkBookmaker(aposta.casa) || "Não disponível"}


`).join("\n")}


📈 Lucro:
+${formatarLucro()}%


`;



    navigator.clipboard.writeText(texto.trim());

}









    function moeda(valor){


        return Number(valor || 0)

        .toLocaleString("pt-BR", {


            style:"currency",


            currency:"BRL"


        });


    }






    function formatarLucro(){


        return Number(

            oportunidade.lucro_percentual || 0

        )

        .toFixed(2);


    }


    function formatarData(){


    const data =
        oportunidade.data_evento
        ||
        oportunidade.data_criacao
        ||
        oportunidade.data;



    if(!data)
        return "--";



    return new Date(data)

        .toLocaleString(
            "pt-BR",
            {
                timeZone: "America/Sao_Paulo",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


function nomeMercado(){


    const mercado = oportunidade.mercado;


    if(!mercado)

        return "--";



    if(mercado === "h2h"){

        return "🏆 Vencedor da partida";

    }



    if(mercado === "totals"){


        const linha = oportunidade.linha;


        const selecoes =

            oportunidade.apostas?.map(

                aposta => aposta.selecao

            ) || [];



        if(selecoes.includes("Over")){


            return `⚽ Mais de ${linha} gols`;

        }



        if(selecoes.includes("Under")){


            return `⚽ Menos de ${linha} gols`;

        }



        return `⚽ Total de gols ${linha}`;

    }



    if(mercado === "spreads"){


        return "🎯 Handicap";

    }



    return mercado;

}



    function tempoRestante(){


    const data = oportunidade.data_evento;


    if(!data)

        return null;



    const inicio = new Date(data);


    const agora = new Date();


    const diferenca = inicio - agora;



    if(diferenca <= 0)

        return "Evento iniciado";



    const horas = Math.floor(
        diferenca /
        (1000 * 60 * 60)
    );


    const dias = Math.floor(
        horas / 24
    );


    const horasRestantes = horas % 24;



    if(dias > 0){

        return `Começa em ${dias}d ${horasRestantes}h`;

    }



    return `Começa em ${horas}h`;

}


    function nomeSelecao(aposta){


    const selecao = aposta.selecao || "";



    if(
        oportunidade.mercado === "totals"
        &&
        oportunidade.linha !== null
        &&
        oportunidade.linha !== undefined
    ){


        if(
            selecao.toLowerCase().includes("over")
        ){

            return `Mais de ${oportunidade.linha} gols`;

        }



        if(
            selecao.toLowerCase().includes("under")
        ){

            return `Menos de ${oportunidade.linha} gols`;

        }


    }

      

    return selecao;


}

 function abrirTodasCasas(){


    const links = apostas

        .map(aposta => ({

            nome: aposta.casa,

            link: obterLinkBookmaker(aposta.casa)

        }))

        .filter(item => item.link);



    const janela = window.open(
        "",
        "_blank"
    );


    janela.document.write(`

        <html>

        <head>

        <title>
        Casas da Surebet
        </title>


        <style>

        body{

            font-family:Arial;
            background:#111;
            color:white;
            padding:30px;

        }


        a{

            display:block;
            margin:15px;
            padding:15px;
            background:#00c853;
            color:white;
            text-decoration:none;
            border-radius:8px;
            font-weight:bold;

        }


        </style>


        </head>


        <body>


        <h2>
        🚀 Casas da oportunidade
        </h2>


        ${
            links.map(item=>`

                <a href="${item.link}" target="_blank">

                    🟢 ${item.nome} ↗

                </a>


            `).join("")
        }


        </body>


        </html>


    `);


}


    return (


        <tr

            className={

                `surebet-row ${nova ? "nova-surebet" : ""}`

            }

        >







            <td>


                <div className="evento-nome">


                    {oportunidade.evento || "Evento"}

                </div>



                <div className="evento-data">


                    📅 {formatarData()}

                    {
                        tempoRestante() &&

                        <div className="tempo-evento">  

                            ⏳ {tempoRestante()}


                </div>

                  }

                </div>

            </td>









            <td>


                <strong>


                    {nomeMercado()}


                </strong>




                {

                    oportunidade.linha != null &&


                    <div className="linha">


                        Linha {oportunidade.linha}


                    </div>


                }


            </td>









            <td>



                {

                    apostas.length === 0 ?


                    (

                        <span>

                            Sem apostas

                        </span>

                    )

                    :


                    apostas.map((aposta,index)=>(



                        <div

    className="casa-item"

    key={aposta.id || index}

>


    <div className="bookmaker-area">

    <a
        href={obterLinkBookmaker(aposta.casa) || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bookmaker-link"
        onClick={(e)=>e.stopPropagation()}
    >
        🟢 {aposta.casa} ↗
    </a>


    {
        obterLinkBookmaker(aposta.casa) &&

        <button
            className="abrir-btn"
            onClick={(e)=>{

                e.stopPropagation();

                window.open(
                    obterLinkBookmaker(aposta.casa),
                    "_blank"
                );

            }}
        >

            Abrir

        </button>

    }


</div>



    <span>

        {nomeSelecao(aposta)}

    </span>



    <span>

        Odd {aposta.odd}

    </span>
    
    <span className="valor-aposta">

    💵 Apostar:

    {" "}

    {moeda(aposta.valor_aposta)}

</span>
    
    <span className="retorno-aposta">

    💰 Retorno:

    {" "}

    {moeda(aposta.retorno)}

</span>

</div>


                    ))

                }



            </td>









            <td>


                <span className="lucro-badge">


                    +{formatarLucro()}%


                </span>


            </td>









            <td>


                {moeda(

                    oportunidade.investimento

                )}


            </td>









            <td>


                {moeda(

                    oportunidade.retorno_final

                )}


            </td>









            <td>


                <div className="acoes">





                    <button


                        className="acao-btn verde"


                        onClick={()=>onSelect(oportunidade)}


                        title="Ver detalhes"


                    >


                        👁


                    </button>



                    <button


                        className="acao-btn azul"


                        onClick={copiarApostas}


                        title="Copiar apostas"


                    >


                        📋


                    </button>


                    

                    


                </div>


            </td>








        </tr>


    );


}



export default SurebetRow;