import "./App.css";


import {

BrowserRouter,

Routes,

Route

} from "react-router-dom";



import Header from "./components/Header/Header";

import Sidebar from "./components/Sidebar/Sidebar";



import DashboardPage from "./pages/DashboardPage";

import SurebetsPage from "./pages/SurebetsPage";

import CalculadoraPage from "./pages/CalculadoraPage";

import MercadosPage from "./pages/MercadosPage";

import ScannerPage from "./pages/ScannerPage";

import ConfigPage from "./pages/ConfigPage";



import { useSurebets } from "./context/SurebetContext";





function App(){



const {

    atualizar

} = useSurebets();







return (



<BrowserRouter>


<div className="app">





<Header

    onRefresh={atualizar}

/>





<div className="content">





<Sidebar />






<main className="main">



<Routes>



<Route

path="/"

element={<DashboardPage />}

/>





<Route

path="/surebets"

element={<SurebetsPage />}

/>





<Route

path="/calculadora"

element={<CalculadoraPage />}

/>





<Route

path="/mercados"

element={<MercadosPage />}

/>





<Route

path="/scanner"

element={<ScannerPage />}

/>





<Route

path="/config"

element={<ConfigPage />}

/>





</Routes>



</main>



</div>




</div>


</BrowserRouter>



);



}



export default App;