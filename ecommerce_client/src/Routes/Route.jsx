import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Shopper } from "../Shopper/shopper";
import { Cart } from "../Shopper/cart";

export function AppRoute ()  {
  return (
    <BrowserRouter>
    <Routes>
        <Route  path="/" element={Shopper} />  
        <Route path="/checkout" element={<Checkout cartItems={products} />}/>
    </Routes>
    </BrowserRouter>
  );
};


