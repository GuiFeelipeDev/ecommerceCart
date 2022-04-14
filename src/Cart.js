import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Axios from "axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Cart() {
  const [soma, setSoma] = useState(0);
  let counter = [];
  const cart = localStorage.getItem("DB");

  const [cartItems, setCartItems] = useState(JSON.parse(cart));
  let aux1 = localStorage.getItem("QNT");

  let aux = JSON.parse(aux1);
  const filt = [...new Set(cartItems.map((val) => val.id))];

  if (aux[0] === undefined) {
    for (let i = 0; i < filt.length; i++) {
      counter[i] = 1;
    }
  } else {
    counter = [...aux];
  }

  useEffect(() => {
    localStorage.setItem("DB", JSON.stringify(cartItems));
    localStorage.setItem("QNT", JSON.stringify(quant));
  }, []);
  const [quant, setQuant] = useState(counter);
  localStorage.setItem("QNT", JSON.stringify(quant));
  useEffect(() => {
    localStorage.setItem("DB", JSON.stringify(cartItems));
  }, [cartItems]);
  const removeItem = (id, index) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    let aux = [...quant];
    let aux2 = [];
    aux[index] = 0;
    for (let i = 0; i < quant.length - 1; i++) {
      if (aux[i] === 0) {
        aux[i] = aux[i + 1];
        aux[i + 1] = 0;
      }
    }
    for (let i = 0; i < quant.length; i++) {
      if (aux[i] !== 0) {
        aux2[i] = aux[i];
      }
    }

    setQuant(aux2);

    setCartItems(newItems);
  };
  useEffect(() => {
    let aux = 0;
    let aux2 = [...new Set(cartItems.map((val) => val.price))];
    for (let i = 0; i < aux2.length; i++) {
      aux = aux + aux2[i] * quant[i];
    }
    setSoma(aux);
  }, [soma, cartItems, quant]);

  const cartFiltItems = [...new Set(cartItems.map((val) => val.id))];

  //filtering
  let cartTemp = [];

  for (let i = 0; i < cartFiltItems.length; i++) {
    for (let c = 0; c < cartItems.length; c++) {
      if (cartItems[c].id === cartFiltItems[i]) {
        cartTemp[i] = cartItems[c];
      }
    }
  }
  //setCartItems(cartTemp);
  //--------

  const increaseQuantity = (index) => {
    let newQuant = [...quant];
    newQuant[index] = quant[index] + 1;
    setQuant(newQuant);
  };
  const decreaseQuantity = (index) => {
    let newQuant = [...quant];
    if (newQuant[index] > 1) {
      newQuant[index] = quant[index] - 1;
    }
    setQuant(newQuant);
  };
  const handleSubmit = () => {
    let submitItems;
    let name = "",
      quantity = "";
    for (let i = 0; i < cartFiltItems.length; i++) {
      name = `${name}` + `${cartTemp[i].title}` + ", ";
      quantity = `${quantity}` + `${quant[i]}` + ", ";
    }
    submitItems = { name: name, quantity: quantity, total: soma };
    if (submitItems.name !== "") {
      axios
        .post(
          "https://sheet.best/api/sheets/639e47a2-c9ef-44d8-9218-a32aac5f8d83",
          submitItems
        )
        .then((response) => {
          console.log(response);
          toast.success("Order done");
        });
    } else {
      toast.error("Order cannot be empty");
    }
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Your Cart</h2>
          <div className="underline"></div>
        </div>
      </section>
      <div className="cart-items">
        <p
          className="remove clear"
          onClick={() => {
            setCartItems([]);
            setQuant([]);
          }}
        >
          Clear Cart
        </p>
        {cartFiltItems.map((item, index) => {
          let dadosItems = [];
          cartItems.forEach((dados) => {
            if (item === dados.id) {
              dadosItems = dados;
            }
          });
          const { id, img, title, price } = dadosItems;
          return (
            <article contentEditable="false" className="cart-item" key={index}>
              <img src={img} alt={title} className="photo" />
              <div className="cart-info">
                <ul>
                  <h4>{title}</h4>
                  <p>${price}</p>
                </ul>
                <p className="remove" onClick={() => removeItem(id, index)}>
                  Remove
                </p>
                <div className="quantity">
                  <AiOutlineMinusCircle
                    onClick={() => decreaseQuantity(index)}
                  />
                  <p contentEditable="false">{quant[index]}</p>
                  <AiOutlinePlusCircle
                    onClick={() => increaseQuantity(index)}
                  />
                </div>
              </div>
            </article>
          );
        })}
        <footer className="cart-footer">
          <h4 contentEditable="false">Total: ${soma.toFixed(2)}</h4>
          <button className="finish-btn" onClick={handleSubmit}>
            Order
          </button>
        </footer>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Cart;
