import CoinDetails from "./Components/CoinDetails";
import HomePage from "./Components/HomePage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </>
  );
}

export default App;
