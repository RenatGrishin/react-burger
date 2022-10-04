import PropTypes from "prop-types";
import { burgerPropTypes } from "../../prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./burgerConstructor.module.css";

const list = {
  bun: "60666c42cc7b410027a1a9b2",
  ingredients: ["60666c42cc7b410027a1a9bf", "60666c42cc7b410027a1a9be"],
};
const state = {
  price: 0,
  bun: {},
  ingredients: [],
};

function BurgerConstructor(props) {
  function getIngredients() {
    state.bun = props.ingredients.find((elem) => elem._id === list.bun);

    state.ingredients = props.ingredients.filter(
      (ingredient) =>
        ingredient.type !== "bun" && list.ingredients.includes(ingredient._id)
    );

    state.price =
      state.bun.price * 2 +
      state.ingredients.reduce((sum, i) => sum + i.price, 0);
  }
  getIngredients();

  return (
    <section className={style.burgerConstructor}>
      <ul className={style.crateBurger}>
        <li key="b1" className={style.list}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={state.bun.name}
            price={state.bun.price}
            thumbnail={state.bun.image}
          />
        </li>
        {state.ingredients.map((i) => (
          <li key={i._id} className={style.list}>
            <div className="mr-1">
              <DragIcon type="primary" />{" "}
            </div>
            <ConstructorElement
              type={i.position}
              isLocked={false}
              text={i.name}
              price={i.price}
              thumbnail={i.image}
            />
          </li>
        ))}

        <li key="b2" className={style.list}>
          <ConstructorElement
            type="button"
            isLocked={true}
            text={state.bun.name}
            price={state.bun.price}
            thumbnail={state.bun.image}
          />
        </li>
      </ul>
      <div className={style.totalSum}>
        <p className="text text_type_digits-medium mr-2">{state.price}</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(burgerPropTypes).isRequired)
    .isRequired,
};

export default BurgerConstructor;
