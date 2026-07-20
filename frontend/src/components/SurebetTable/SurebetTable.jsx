import { useMemo, useState } from "react";

import "./SurebetTable.css";

import SurebetRow from "./SurebetRow";

import SurebetModal from "./SurebetModal";



function SurebetTable({ oportunidades = [] }) {


    const [selecionada, setSelecionada] = useState(null);




    const listaOrdenada = useMemo(()=>{


        return [...oportunidades].sort(

            (a,b)=>

                Number(b.lucro_percentual || 0)

                -

                Number(a.lucro_percentual || 0)

        );


    },[oportunidades]);







    return (


        <>


            <div className="table-container">



                <table className="surebet-table">



                    <thead>


                        <tr>


                            <th>

                                Evento

                            </th>


                            <th>

                                Mercado

                            </th>


                            <th>

                                Casas / Odds

                            </th>


                            <th>

                                Lucro

                            </th>


                            <th>

                                Investimento

                            </th>


                            <th>

                                Retorno

                            </th>


                            <th>

                                Ações

                            </th>


                        </tr>


                    </thead>





                    <tbody>



                        {

                            listaOrdenada.length === 0 ? (


                                <tr>


                                    <td

                                        colSpan="7"

                                        className="empty-table"

                                    >


                                        <div className="empty-icon">

                                            🔎

                                        </div>



                                        <h3>

                                            Nenhuma Surebet encontrada

                                        </h3>



                                        <p>

                                            Ajuste os filtros ou execute o scanner.

                                        </p>


                                    </td>


                                </tr>



                            )

                            :



                            listaOrdenada.map((oportunidade)=>(


                                <SurebetRow


                                    key={oportunidade.id}


                                    oportunidade={oportunidade}


                                    onSelect={setSelecionada}


                                />


                            ))


                        }




                    </tbody>



                </table>



            </div>






            <SurebetModal


                oportunidade={selecionada}


                onClose={()=>setSelecionada(null)}


            />



        </>


    );


}



export default SurebetTable;