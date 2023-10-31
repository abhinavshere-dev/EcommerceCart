import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateCoupan from "./Shopper/GenerateCoupan";
import { Cart } from "./Shopper/cart";
import { Shopper } from "./Shopper/shopper";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Shopper />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/generate-coupan" element={<GenerateCoupan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
