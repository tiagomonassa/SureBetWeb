import "./Sidebar.css";


import { Link } from "react-router-dom";



function Sidebar(){


return (

<aside className="sidebar">


<div className="sidebar-title">

MENU

</div>



<nav className="menu">



<Link
to="/"
className="menu-item"
>

🏠 Dashboard

</Link>



<Link
to="/calculadora"
className="menu-item"
>

🧮 Calculadora

</Link>




<Link
to="/mercados"
className="menu-item"
>

📊 Mercados

</Link>


<Link
to="/config"
className="menu-item"
>

⚙️ Configurações

</Link>



</nav>



</aside>

);


}


export default Sidebar;