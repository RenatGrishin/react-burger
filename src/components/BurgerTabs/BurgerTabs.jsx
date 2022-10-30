import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burgerTabs.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function BurgerTabs() {
  const ingredientTab = useSelector(
    (state) => state.ingredientTabReducer.ingredientTab
  );

  return (
    <nav className={style.navigation}>
      <Tab
        value="buns"
        active={ingredientTab === "buns" ? true : false}
        onClick={() => {}}
      >
        Булки
      </Tab>
      <Tab
        value="sauces"
        active={ingredientTab === "sauces" ? true : false}
        onClick={() => {}}
      >
        Соусы
      </Tab>
      <Tab
        value="fillings"
        active={ingredientTab === "fillings" ? true : false}
        onClick={() => {}}
      >
        Начинки
      </Tab>
    </nav>
  );
}

export default BurgerTabs;
