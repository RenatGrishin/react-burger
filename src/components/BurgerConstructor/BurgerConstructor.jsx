import { useSelector, useDispatch } from "react-redux";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useReducer, useState, useContext } from "react";
import { setOrderApi } from "../../utils/burger-api.js";
import {
  CONSTRUCTOR_INGREDIENT_INITIAL,
  CONSTRUCTOR_INGREDIENT_PRICE_SET,
  MODAL_ORDER_OPEN,
  MODAL_ORDER_CLOSE,
  MODAL_ORDER_SET,
} from "../../services/actions.js";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

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
  const data = useSelector((store) => store.dataList.data);
  //const [modal, setModal] = useState(false);
  const [order, setOrder] = useState({ name: "", order: { number: 0 } });

  const [stateBun, dispatchBun] = useReducer(reducerBun, initialBun);
  const [stateIngredients, dispatchIngredients] = useReducer(
    reducerIngredients,
    initialIngredients
  );

  const dataStatus = useSelector((store) => store.dataList.dataStatus);
  const constructor = useSelector((store) => store.constructorEdit.constructor);
  const modal = useSelector((state) => state.modalWindow.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CONSTRUCTOR_INGREDIENT_INITIAL,
      bun: addIngredients("60d3b41abdacab0026a733c6", true),
      ingredients: addInitialIngredients([
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cf",
      ]),
    });
  }, [dataStatus]);

  useEffect(() => {
    if (
      typeof constructor.bun === "object" &&
      Object.keys(constructor.bun).length > 0 &&
      constructor.ingredients.length > 0
    ) {
      dispatch({
        type: CONSTRUCTOR_INGREDIENT_PRICE_SET,
        price: constructor.ingredients.reduce(
          (sum, i) => sum + i.price,
          constructor.bun.price * 2
        ),
      });
    }
  }, [constructor.bun, constructor.ingredients]);

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
    if (val) {
      dispatch({
        type: MODAL_ORDER_OPEN,
      });
    } else {
      dispatch({
        type: MODAL_ORDER_CLOSE,
      });
    }
  }

  function getIngredientsListForApi() {
    const arr = [];
    arr.push(constructor.bun._id);
    constructor.ingredients.forEach((item) => {
      arr.push(item._id);
    });
    arr.push(constructor.bun._id);
    return { ingredients: arr };
  }

  function getOrder() {
    const ingredientsList = getIngredientsListForApi();

    setOrderApi(ingredientsList).then((data) => {
      dispatch({ type: MODAL_ORDER_SET, number: data.order.number });
      toggleModal(true);
    });
  }

  return (
    <section className={style.burgerConstructor}>
      {dataStatus.loading || dataStatus.error ? (
        <h1>{dataStatus.text}</h1>
      ) : (
        <>
          <ul className={style.crateBurger}>
            {typeof constructor.bun === "object" &&
              Object.keys(constructor.bun).length > 0 && (
                <li className={style.list}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={constructor.bun.name}
                    price={constructor.bun.price}
                    thumbnail={constructor.bun.image}
                  />
                </li>
              )}

            {constructor.ingredients.length > 0 &&
              constructor.ingredients.map((i) => (
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

            {typeof constructor.bun === "object" &&
              Object.keys(constructor.bun).length > 0 && (
                <li className={style.list}>
                  <ConstructorElement
                    type="button"
                    isLocked={true}
                    text={constructor.bun.name}
                    price={constructor.bun.price}
                    thumbnail={constructor.bun.image}
                  />
                </li>
              )}
          </ul>
          <div className={style.totalSum}>
            <p className="text text_type_digits-medium mr-2">
              {constructor.price}
            </p>
            <CurrencyIcon type="primary" />
            <Button onClick={getOrder} type="primary" size="large">
              Оформить заказ
            </Button>
          </div>

          {modal.order.show && (
            <Modal show={modal} onClose={toggleModal}>
              <OrderDetails number={modal.order.number} />
            </Modal>
          )}
        </>
      )}
    </section>
  );
}

export default BurgerConstructor;
