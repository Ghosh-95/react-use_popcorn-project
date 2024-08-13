import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CurrencyConverter from "./challenge/CurrencyConverter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CurrencyConverter />
    </React.StrictMode>
)