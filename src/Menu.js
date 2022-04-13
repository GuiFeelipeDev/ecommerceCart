import React, { useState, useEffect } from "react";
import { useCart } from "./context";

import { ToastContainer, toast } from "react-toastify";
import { capitalize } from "@mui/material";

const Menu = ({ items }) => {
  const cart = useCart().onCart;
  let quantity = [];
  useEffect(() => {
    const temp = localStorage.getItem("DB");
    const temp2 = JSON.parse(temp);
    setOnCart(...onCart, temp2);
  }, []);
  const [onCart, setOnCart] = useState(cart);

  console.log(onCart);
  const addToCart = (menuItem) => {
    if (onCart != null) {
      setOnCart([...onCart, menuItem]);
    } else {
      setOnCart(menuItem);
    }
    let aux = localStorage.getItem("QNT");
    let aux1 = JSON.parse(aux);
    aux1 = [...aux1, 1];
    localStorage.setItem("QNT", JSON.stringify(aux1));
    toast.success(capitalize(`${menuItem.title}` + " Sucessfully added"));
    //basicAlert();
  };

  useEffect(() => {
    localStorage.setItem("DB", JSON.stringify(onCart));
  }, [onCart]);
  return (
    <div className="section-center">
      {items.map((menuItem) => {
        const { id, title, img, desc, price } = menuItem;
        return (
          <article className="menu-item" key={id}>
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
              <div className="btn-format">
                <button
                  type="button"
                  className="btn-add"
                  onClick={() => addToCart(menuItem)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default Menu;
