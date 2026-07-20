import { useEffect, useState } from "react";

import { buscarOportunidades } from "../services/api";


function useSurebets() {


  const [oportunidades, setOportunidades] = useState([]);

  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(null);



  async function carregarOportunidades() {


    try {


      setCarregando(true);

      setErro(null);



      const dados = await buscarOportunidades();



      setOportunidades(
        Array.isArray(dados)
          ? dados
          : []
      );



    } catch (error) {


      console.error(
        "Erro ao buscar oportunidades:",
        error
      );


      setErro(
        "Não foi possível carregar as oportunidades."
      );



    } finally {


      setCarregando(false);


    }


  }



  useEffect(() => {


    carregarOportunidades();


  }, []);




  return {


    oportunidades,


    carregando,


    erro,


    atualizar:

    carregarOportunidades


  };


}


export default useSurebets;