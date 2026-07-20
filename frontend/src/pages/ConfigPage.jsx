import "./ConfigPage.css";

import { useState } from "react";

import { useSurebets } from "../context/SurebetContext";



function ConfigPage(){



    const {

        banca,

        setBanca


    } = useSurebets();




    const [lucroMinimo,setLucroMinimo] = useState(0);


    const [intervalo,setIntervalo] = useState(15);



    const [mercados,setMercados] = useState({


        h2h:true,


        totals:true,


        spreads:true,


        corners:false


    });







    function alternar(nome){


        setMercados({


            ...mercados,


            [nome]:!mercados[nome]


        });


    }









    return (


        <div className="config-page">







            <div className="section-title">


                <h2>


                    ⚙️ Configurações do Sistema


                </h2>


            </div>











            <div className="config-grid">







                <div className="config-card">



                    <h3>


                        💰 Gestão da banca


                    </h3>





                    <label>


                        Valor padrão


                    </label>





                    <input


                    type="number"


                    value={banca}

onChange={(e) => {

    const valor = e.target.value;

    if (valor === "") {

        setBanca("");

        return;

    }

    setBanca(Number(valor));

}}


                    />



                    <small>


                        Valor usado nos cálculos


                    </small>



                </div>













                <div className="config-card">



                    <h3>


                        📈 Filtro de oportunidades


                    </h3>





                    <label>


                        Lucro mínimo (%)


                    </label>





                    <input


                    type="number"


                    value={lucroMinimo}


                    onChange={

                        e =>

                        setLucroMinimo(

                            Number(

                                e.target.value

                            )

                        )

                    }


                    />


                </div>













                <div className="config-card">



                    <h3>


                        🔄 Atualização


                    </h3>





                    <label>


                        Intervalo do sistema


                    </label>





                    <input


                    type="number"


                    value={intervalo}


                    onChange={

                        e =>

                        setIntervalo(

                            Number(

                                e.target.value

                            )

                        )

                    }


                    />





                    <small>


                        segundos


                    </small>



                </div>












            </div>












            <div className="config-card mercados-card">



                <h3>


                    📊 Mercados ativos


                </h3>







                <label>


                <input


                type="checkbox"


                checked={mercados.h2h}


                onChange={()=>alternar("h2h")}


                />


                🏆 1X2


                </label>









                <label>


                <input


                type="checkbox"


                checked={mercados.totals}


                onChange={()=>alternar("totals")}


                />


                ⚽ Totais


                </label>









                <label>


                <input


                type="checkbox"


                checked={mercados.spreads}


                onChange={()=>alternar("spreads")}


                />


                🎯 Handicap


                </label>









                <label>


                <input


                type="checkbox"


                disabled


                />


                🚩 Escanteios (em breve)


                </label>





            </div>







        </div>


    );


}



export default ConfigPage;