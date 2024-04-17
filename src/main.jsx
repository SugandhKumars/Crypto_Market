import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CryptoProvider } from "./Context/CryptoContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
