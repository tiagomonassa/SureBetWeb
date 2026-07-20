export function calcularSurebet(

    oddCasa,

    oddEmpate,

    oddVisitante,

    valorTotal

) {


    oddCasa = Number(oddCasa);
    oddEmpate = Number(oddEmpate);
    oddVisitante = Number(oddVisitante);
    valorTotal = Number(valorTotal);





    const probabilidadeCasa = 1 / oddCasa;

    const probabilidadeEmpate = 1 / oddEmpate;

    const probabilidadeVisitante = 1 / oddVisitante;





    const soma =

        probabilidadeCasa +

        probabilidadeEmpate +

        probabilidadeVisitante;







    const probabilidade = soma * 100;







    // Não é surebet

    if (soma >= 1) {


        return {


            ehSurebet:false,


            probabilidade:Number(

                probabilidade.toFixed(2)

            ),


            retorno:0,


            lucro:0,


            investimentos:{


                casa:0,


                empate:0,


                visitante:0


            }


        };


    }









    // Retorno garantido

    const retorno = valorTotal / soma;







    const lucro =

        ((retorno - valorTotal) / valorTotal) * 100;









    // Distribuição correta das apostas

    const investimentoCasa =

        valorTotal *

        (probabilidadeCasa / soma);




    const investimentoEmpate =

        valorTotal *

        (probabilidadeEmpate / soma);




    const investimentoVisitante =

        valorTotal *

        (probabilidadeVisitante / soma);









    return {


        ehSurebet:true,



        probabilidade:Number(

            probabilidade.toFixed(2)

        ),



        retorno:Number(

            retorno.toFixed(2)

        ),



        lucro:Number(

            lucro.toFixed(2)

        ),



        investimentos:{


            casa:Number(

                investimentoCasa.toFixed(2)

            ),



            empate:Number(

                investimentoEmpate.toFixed(2)

            ),



            visitante:Number(

                investimentoVisitante.toFixed(2)

            )


        }



    };


}