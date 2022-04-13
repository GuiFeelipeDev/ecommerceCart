import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
//import items from "./data";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useItems } from "./context";

function App() {
  const items = useItems().menuItems;
  const allCategories = ["all", ...new Set(items.map((item) => item.category))];

  const [menuItems, setMenuItems] = useState(items);
  //console.log(menuItems);
  const [categories, setCategories] = useState(allCategories);
  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <div className="title-align">
            <h2>our menu </h2>
            <Link to="/cart">
              <a>
                <TiShoppingCart />
              </a>
            </Link>
          </div>

          <div className="underline"></div>
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
