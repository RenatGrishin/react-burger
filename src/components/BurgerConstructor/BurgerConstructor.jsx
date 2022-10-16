import PropTypes, { func } from "prop-types";
import { burgerPropTypes } from "../../prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useReducer, useState, useContext } from "react";
import { setOrderApi } from "../../utils/burger-api.js";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { DataContext } from "../../services/dataContext";

import style from "./burgerConstructor.module.css";

const initialBun = {};
const initialIngredients = [];

function reducerBun(state, action) {
  switch (action.type) {
    case "add":
      return action.ingredient;
    default:
      return state;
  }
}
function reducerIngredients(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.ingredient];
    case "initial":
      return action.ingredients;
    default:
      return state;
  }
}

function BurgerConstructor() {
  const { data } = useContext(DataContext);
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({ name: "", order: { number: 0 } });

  const [stateBun, dispatchBun] = useReducer(reducerBun, initialBun);
  const [stateIngredients, dispatchIngredients] = useReducer(
    reducerIngredients,
    initialIngredients
  );

  useEffect(() => {
    dispatchBun({
      type: "add",
      ingredient: addIngredients("60d3b41abdacab0026a733c6", true),
    });
    dispatchIngredients({
      type: "initial",
      ingredients: addInitialIngredients([
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cf",
      ]),
    });
  }, []);

  useEffect(() => {
    setPrice(
      stateIngredients.reduce((sum, i) => sum + i.price, stateBun.price * 2)
    );
  }, [stateBun, stateIngredients]);

  function addIngredients(id, bun = false) {
    if (bun) {
      return data.find((elem) => elem._id === id && elem.type === "bun");
    }
    return data.find((ing) => ing._id === id && ing.type !== "bun");
  }
  function addInitialIngredients(arrId) {
    let newArr = [];
    arrId.forEach((id) => {
      let elem = data.find((ing) => ing._id === id && ing.type !== "bun");
      if (elem) newArr.push(elem);
    });
    return newArr;
  }

  function toggleModal(val) {
    setModal(val);
  }
  function getOrder() {
    setOrderApi().then((data) => {
      setModal(true);
      setOrder({ name: data.name, order: data.order });
    });
  }

  return (
    <section className={style.burgerConstructor}>
      <ul className={style.crateBurger}>
        {Object.keys(stateBun).length > 0 && (
          <li className={style.list}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={stateBun.name}
              price={stateBun.price}
              thumbnail={stateBun.image}
            />
          </li>
        )}

        {stateIngredients.length > 0 &&
          stateIngredients.map((i) => (
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

        {Object.keys(stateBun).length > 0 && (
          <li className={style.list}>
            <ConstructorElement
              type="button"
              isLocked={true}
              text={stateBun.name}
              price={stateBun.price}
              thumbnail={stateBun.image}
            />
          </li>
        )}
      </ul>
      <div className={style.totalSum}>
        <p className="text text_type_digits-medium mr-2">{price}</p>
        <CurrencyIcon type="primary" />
        <Button onClick={getOrder} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal show={modal} onClose={toggleModal}>
          <OrderDetails number={order.order.number} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
