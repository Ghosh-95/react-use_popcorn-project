import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Expander from "./challenge/TextExpander";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Expander />
    </React.StrictMode>
)