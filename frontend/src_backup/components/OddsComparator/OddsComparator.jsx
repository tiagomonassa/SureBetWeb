import { calcularSurebet } from "../../utils/surebet";

import "./OddsComparator.css";


function OddsComparator({ odds = [] }) {


    function agruparEventos() {


        const eventos = {};



        odds.forEach((item)=>{


            if(!eventos[item.evento]){


                eventos[item.evento] = [];


            }



            eventos[item.evento].push(item);



        });



        return eventos;


    }





    function encontrarMelhoresOdds(lista) {


        const melhores = {};



        lista.forEach((jogo)=>{


            Object.entries(jogo.odds)
            .forEach(([resultado, odd])=>{


                if(
                    !melhores[resultado] ||
                    odd > melhores[resultado].odd
                ){


                    melhores[resultado] = {


                        odd,


                        casa:jogo.casa


                    };


                }


            });



        });



        return melhores;


    }





    function analisar(lista){


        const melhores =
        encontrarMelhoresOdds(lista);



        const calculo =
        calcularSurebet(

            Object.entries(melhores)
            .map(
                ([nome,item])=>({

                    nome,

                    odd:item.odd

                })
            )

        );



        return {


            melhores,

            calculo


        };



    }





    const eventos =
    agruparEventos();






    return (


        <section className="comparador">


            <h2>
                🔎 Comparador de Odds
            </h2>





            {
            Object.entries(eventos)
            .map(
            ([evento,jogos])=>{


                const resultado =
                analisar(jogos);



                return (


                <div

                key={evento}

                className={

                resultado.calculo?.existe

                ?

                "comparacao-card surebet"

                :

                "comparacao-card"

                }


                >




                    <div className="comparacao-header">


                        <h3>
                            {evento}
                        </h3>



                        {

                        resultado.calculo?.existe &&


                        <div className="badge-surebet">

                            🚀 SUREBET

                            <br/>

                            +{resultado.calculo.lucro}%

                        </div>


                        }



                    </div>







                    <div className="odds-melhores">



                    {

                    Object.entries(resultado.melhores)
                    .map(
                    ([nome,item])=>(


                        <div

                        className="melhor-odd"

                        key={nome}

                        >



                            <strong>
                                {nome}
                            </strong>



                            <span>

                                Odd {item.odd}

                            </span>



                            <small>

                                {item.casa}

                            </small>



                        </div>


                    )

                    )


                    }



                    </div>





                </div>


                );


            })


            }





        </section>


    );


}


export default OddsComparator;