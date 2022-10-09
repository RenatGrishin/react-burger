import PropTypes, { func } from "prop-types";
import { burgerPropTypes } from "../../prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import style from "./burgerConstructor.module.css";

const selectedBun = "60d3b41abdacab0026a733c6";
const selectedIngredients = [
  "60d3b41abdacab0026a733c8",
  "60d3b41abdacab0026a733ca",
];

let price = 0;
let bun = {};
let ingredients = [];

function BurgerConstructor(props) {
  const [modal, setModal] = useState(false);

  function getIngredients() {
    bun = props.ingredients.find((elem) => elem._id === selectedBun);

    ingredients = props.ingredients.filter(
      (ingredient) =>
        ingredient.type !== "bun" &&
        selectedIngredients.includes(ingredient._id)
    );

    price = bun.price * 2 + ingredients.reduce((sum, i) => sum + i.price, 0);
  }
  getIngredients();

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <section className={style.burgerConstructor}>
      <ul className={style.crateBurger}>
        <li className={style.list}>
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

        <li className={style.list}>
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
        <Button onClick={toggleModal} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

      <Modal show={modal} onClose={toggleModal}>
        <OrderDetails />
      </Modal>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(burgerPropTypes).isRequired)
    .isRequired,
};

export default BurgerConstructor;
