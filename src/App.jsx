import CoinDetails from "./Components/CoinDetails";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";

import { useContext } from "react";
import { CryptoContext } from "./Context/CryptoContext";
function App() {
  const { isDark, setIsDark } = useContext(CryptoContext);
  return (
    <div className={`${isDark && "bg-black text-white"}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </div>
  );
}

export default App;
