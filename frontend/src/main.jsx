import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";


import {

  SurebetProvider

} from "./context/SurebetContext.jsx";





ReactDOM.createRoot(

  document.getElementById("root")

).render(


  <React.StrictMode>


    <SurebetProvider>


      <App />


    </SurebetProvider>


  </React.StrictMode>


);