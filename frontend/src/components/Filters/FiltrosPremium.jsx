import "./FiltrosPremium.css";

import { useSurebets } from "../../context/SurebetContext";


function FiltrosPremium(){

    const {

        filtros,

        atualizarFiltros,

        esportes

    } = useSurebets();



    return (

        <div className="filtros-premium">


            <div className="filtro-item">

                <label>

                    🔎 Buscar evento

                </label>


                <input

                    type="text"

                    placeholder="Digite o evento..."

                    value={filtros.busca}

                    onChange={(e)=>

                        atualizarFiltros({

                            busca:e.target.value

                        })

                    }

                />

            </div>





            <div className="filtro-item">


                <label>

                    ⚽ Esporte

                </label>


                <select

                    value={filtros.esporte}

                    onChange={(e)=>

                        atualizarFiltros({

                            esporte:e.target.value

                        })

                    }

                >

                    <option>

                        Todos

                    </option>


                    {

                        esportes.map((esporte)=>(

                            <option

                                key={esporte}

                                value={esporte}

                            >

                                {esporte}

                            </option>

                        ))

                    }


                </select>


            </div>






            <div className="filtro-item">


                <label>

                    🎯 Mercado

                </label>



                <select

                    value={filtros.mercado}

                    onChange={(e)=>

                        atualizarFiltros({

                            mercado:e.target.value

                        })

                    }

                >

                    <option>

                        Todos

                    </option>


                    <option value="h2h">

                        Resultado

                    </option>


                    <option value="totals">

                        Totais

                    </option>


                    <option value="spread">

                        Handicap

                    </option>


                </select>


            </div>







            <div className="filtro-item">


                <label>

                    💰 Lucro mínimo

                </label>



                <select

                    value={filtros.lucroMinimo}

                    onChange={(e)=>

                        atualizarFiltros({

                            lucroMinimo:

                            Number(e.target.value)

                        })

                    }

                >

                    <option value="0">

                        0%

                    </option>


                    <option value="1">

                        1%

                    </option>


                    <option value="2">

                        2%

                    </option>


                    <option value="5">

                        5%

                    </option>


                    <option value="10">

                        10%

                    </option>


                </select>


            </div>





        </div>

    );

}


export default FiltrosPremium;