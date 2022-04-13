import React, { createContext, useState, useContext } from "react";
import items from "../data";

const ItemContext = createContext();

export default function ItemsProvider({ children }) {
  const [menuItems, setMenuItems] = useState(items);
  return (
    <ItemContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  const { menuItems, setMenuItems } = context;
  return { menuItems, setMenuItems };
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [onCart, setOnCart] = useState([]);
  return (
    <CartContext.Provider value={{ onCart, setOnCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  const { onCart, setOnCart } = context;
  return { onCart, setOnCart };
}
