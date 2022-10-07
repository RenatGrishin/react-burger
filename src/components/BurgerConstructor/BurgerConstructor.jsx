import PropTypes from "prop-types";
import { burgerPropTypes } from "../../prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import style from "./burgerConstructor.module.css";

const list = {
  bun: "60d3b41abdacab0026a733c6",
  ingredients: ["60d3b41abdacab0026a733c8", "60d3b41abdacab0026a733ca"],
};
let price = 0;
let bun = {};
let ingredients = [];

function BurgerConstructor(props) {
  const [modal, setModal] = useState(false);

  function getIngredients() {
    bun = props.ingredients.find((elem) => elem._id === list.bun);

    ingredients = props.ingredients.filter(
      (ingredient) =>
        ingredient.type !== "bun" && list.ingredients.includes(ingredient._id)
    );

    price = bun.price * 2 + ingredients.reduce((sum, i) => sum + i.price, 0);
  }
  getIngredients();

  return (
    <section className={style.burgerConstructor}>
      <ul className={style.crateBurger}>
        <li key="b1" className={style.list}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        {ingredients.map((i) => (
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
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className={style.totalSum}>
        <p className="text text_type_digits-medium mr-2">{price}</p>
        <CurrencyIcon type="primary" />
        <Button
          onClick={() => {
            setModal(true);
          }}
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>

      <ModalOverlay
        type="order"
        show={modal}
        onClose={() => {
          setModal(false);
        }}
      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(burgerPropTypes).isRequired)
    .isRequired,
};

export default BurgerConstructor;
