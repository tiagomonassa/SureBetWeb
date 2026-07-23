import { useState } from "react";
import "./Calculadora.css";


function Calculadora() {


  const [odd1, setOdd1] = useState("");
  const [odd2, setOdd2] = useState("");
  const [odd3, setOdd3] = useState("");

  const [valor, setValor] = useState("1000");

  const [resultado, setResultado] = useState(null);





  function calcularSurebet(){


    const o1 = Number(odd1);
    const o2 = Number(odd2);
    const o3 = Number(odd3);



    const investimento = Number(valor);



    let soma = 0;



    if(o1 > 0)
      soma += 1 / o1;



    if(o2 > 0)
      soma += 1 / o2;



    if(o3 > 0)
      soma += 1 / o3;





    if(soma === 0){

      return;

    }





    const lucro =

      ((1 / soma) - 1) * 100;





    const aposta1 =

      o1 > 0

      ?

      investimento / (o1 * soma)

      :

      0;





    const aposta2 =

      o2 > 0

      ?

      investimento / (o2 * soma)

      :

      0;





    const aposta3 =

      o3 > 0

      ?

      investimento / (o3 * soma)

      :

      0;





    setResultado({


      lucro,


      aposta1,


      aposta2,


      aposta3,


      retorno:

        investimento * (lucro / 100),



      isSurebet:

        lucro > 0


    });



  }







return (

<section className="calculadora-container">



<div className="calc-header">

<h2>

🧮 Calculadora Surebet

</h2>


<span>

Análise manual

</span>


</div>







<div className="calc-grid">



<div className="calc-card">

<label>
Odd Resultado 1
</label>

<input

type="number"

value={odd1}

onChange={
e=>setOdd1(e.target.value)
}

placeholder="Ex: 2.10"

/>

</div>







<div className="calc-card">

<label>
Odd Resultado 2
</label>

<input

type="number"

value={odd2}

onChange={
e=>setOdd2(e.target.value)
}

placeholder="Ex: 2.20"

/>

</div>







<div className="calc-card">

<label>
Odd Resultado 3
</label>

<input

type="number"

value={odd3}

onChange={
e=>setOdd3(e.target.value)
}

placeholder="Opcional"

/>

</div>







<div className="calc-card">

<label>
Investimento Total
</label>

<input

type="number"

value={valor}

onChange={
e=>setValor(e.target.value)
}

/>

</div>


</div>








<button

className="calculate-btn"

onClick={calcularSurebet}

>

Calcular Surebet

</button>









{resultado && (


<div

className={

resultado.isSurebet

?

"result-box positive"

:

"result-box negative"

}


>



<h3>

Resultado da análise

</h3>







<div className="status">


{

resultado.isSurebet

?

"✅ É uma Surebet válida"

:

"❌ Não é uma Surebet"

}


</div>









<div className="profit-value">


Lucro:

{" "}

{resultado.lucro.toFixed(2)}%



</div>









<div className="bets">


<p>

Aposta 1:

R$ {resultado.aposta1.toFixed(2)}

</p>


<p>

Aposta 2:

R$ {resultado.aposta2.toFixed(2)}

</p>


{

resultado.aposta3 > 0 &&

<p>

Aposta 3:

R$ {resultado.aposta3.toFixed(2)}

</p>

}



</div>






<div className="return-value">


Retorno:


{" "}



<span

className={

resultado.retorno >= 0

?

"positive-return"

:

"negative-return"

}

>


{

resultado.retorno >= 0

?

"+ "

:

"- "

}



R$ {

Math.abs(resultado.retorno)

.toFixed(2)

.replace(".",",")

}



</span>



</div>





</div>


)}








</section>


);


}



export default Calculadora;