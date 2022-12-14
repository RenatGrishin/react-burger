import { useContext } from "react";
import BurgerTabs from "../BurgerTabs/BurgerTabs";
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from "prop-types";
import { burgerPropTypes } from "../../prop-types";

import style from "./burgerIngredients.module.css";

import { DataContext } from "../../services/dataContext";

function BurgerIngredients() {
  const { data } = useContext(DataContext);

  const bun = data.filter((arr) => arr.type === "bun");
  const mains = data.filter((arr) => arr.type === "main");
  const sauces = data.filter((arr) => arr.type === "sauce");

  return (
    <section className={style.burgerIngredients}>
      <p className="text text_type_main-large pt-10">Соберите бургер</p>
      <BurgerTabs />

      <section className={style.ingredients}>
        <div>
          <p className="text text_type_main-medium">Булки</p>
          <ul className={style.ingredientsList}>
            {bun.map((elem) => (
              <Ingredient key={elem._id} data={elem} />
            ))}
          </ul>
        </div>

        <div>
          <p className="text text_type_main-medium">Соусы</p>
          <ul className={style.ingredientsList}>
            {sauces.map((elem) => (
              <Ingredient key={elem._id} data={elem} />
            ))}
          </ul>
        </div>

        <div>
          <p className="text text_type_main-medium">Начинки</p>
          <ul className={style.ingredientsList}>
            {mains.map((elem) => (
              <Ingredient key={elem._id} data={elem} />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

export default BurgerIngredients;
