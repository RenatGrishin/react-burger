import BurgerTabs from "../BurgerTabs/BurgerTabs";
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from "prop-types";
import { burgerPropTypes } from "../../prop-types";

import style from "./burgerIngredients.module.css";

const state = {
  bun: [],
  mains: [],
  sauces: [],
};

function BurgerIngredients(props) {
  state.bun = props.ingredients.filter((arr) => arr.type === "bun");
  state.mains = props.ingredients.filter((arr) => arr.type === "main");
  state.sauces = props.ingredients.filter((arr) => arr.type === "sauce");

  return (
    <section className={style.burgerIngredients}>
      <p className="text text_type_main-large pt-10">Соберите бургер</p>
      <BurgerTabs />

      <section className={style.ingredients}>
        <div>
          <p className="text text_type_main-medium">Булки</p>
          <ul className={style.ingredientsList}>
            {state.bun.map((elem) => (
              <Ingredient key={elem._id} data={elem} />
            ))}
          </ul>
        </div>

        <div>
          <p className="text text_type_main-medium">Соусы</p>
          <ul className={style.ingredientsList}>
            {state.sauces.map((elem) => (
              <Ingredient key={elem._id} data={elem} />
            ))}
          </ul>
        </div>

        <div>
          <p className="text text_type_main-medium">Начинки</p>
          <ul className={style.ingredientsList}>
            {state.mains.map((elem) => (
              <Ingredient key={elem._id} data={elem} />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(burgerPropTypes).isRequired)
    .isRequired,
};

export default BurgerIngredients;
