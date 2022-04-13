import React from "react";
import Hero from "./Hero";
import Cart from "./Cart";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import ItemsProvider, { CartProvider } from "./context/index";
function App() {
  return (
    <>
      <CartProvider>
        <ItemsProvider>
          <Router>
            <Routes>
              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<Hero />}
              ></Route>
              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={<Cart />}
              ></Route>
            </Routes>
          </Router>
        </ItemsProvider>
      </CartProvider>
    </>
  );
}

export default App;
