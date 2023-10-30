import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Shopper } from "./Shopper/shopper";
import { Cart } from "./Shopper/cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Shopper />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
