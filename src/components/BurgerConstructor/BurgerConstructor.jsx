import { useSelector, useDispatch } from "react-redux";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { setOrderApi } from "../../utils/burger-api.js";
import {
  CONSTRUCTOR_INGREDIENT_PRICE_SET,
  MODAL_ORDER_OPEN,
  MODAL_ORDER_CLOSE,
  MODAL_ORDER_SET,
  CONSTRUCTOR_INGREDIENT_ADD_BUN,
  CONSTRUCTOR_INGREDIENT_ADD_INGREDIENTS,
  CONSTRUCTOR_INGREDIENT_DELETE_INGREDIENTS,
} from "../../services/actions.js";
import { useDrop } from "react-dnd";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import ConstructorList from "../ConstructorList/ConstructorList";

import style from "./burgerConstructor.module.css";

function BurgerConstructor() {
  const dataStatus = useSelector((store) => store.dataList.dataStatus);
  const constructor = useSelector((store) => store.constructorEdit.constructor);
  const modal = useSelector((state) => state.modalWindow.modal);
  const dnd = useSelector((state) => state.dndReducer.dnd);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop() {
      addIngredients(dnd.ingredient);
    },
  });

  useEffect(() => {
    dispatch({
      type: CONSTRUCTOR_INGREDIENT_PRICE_SET,
      price: getPrice(constructor.bun, constructor.ingredients),
    });
  }, [constructor.bun, constructor.ingredients]);

  function addIngredients(ingredient) {
    if (ingredient.type === "bun") {
      dispatch({
        type: CONSTRUCTOR_INGREDIENT_ADD_BUN,
        bun: ingredient,
      });
    } else {
      dispatch({
        type: CONSTRUCTOR_INGREDIENT_ADD_INGREDIENTS,
        ingredient: createIdAndSortIngredient(ingredient),
      });
    }
  }

  function deleteIngredient(keyId) {
    const newArr = constructor.ingredients.filter(
      (elem) => elem.keyId !== keyId
    );

    if (newArr.length === 0) return;

    for (let i = 0; i < newArr.length; i++) {
      newArr[i].sortNum = i;
    }
    dispatch({
      type: CONSTRUCTOR_INGREDIENT_DELETE_INGREDIENTS,
      ingredients: newArr,
    });
  }

  function createIdAndSortIngredient(ingredient) {
    let randKeyId = Math.floor(Math.random() * 99);
    let original = false;
    let sortNum = 0;

    if (constructor.ingredients.length > 0) {
      do {
        original = constructor.ingredients.find(
          (ing) => ing.keyId === randKeyId
        )
          ? false
          : true;
      } while (!original);

      sortNum =
        constructor.ingredients[constructor.ingredients.length - 1].sortNum + 1;
    }
    return {
      ...ingredient,
      keyId: randKeyId,
      sortNum: sortNum,
    };
  }

  function getPrice() {
    if (
      Object.keys(constructor.bun).length > 0 &&
      constructor.ingredients.length > 0
    ) {
      return constructor.ingredients.reduce(
        (sum, i) => sum + i.price,
        constructor.bun.price * 2
      );
    } else if (
      Object.keys(constructor.bun).length === 0 &&
      constructor.ingredients.length > 0
    ) {
      return constructor.ingredients.reduce((sum, i) => sum + i.price, 0);
    } else if (
      Object.keys(constructor.bun).length > 0 &&
      constructor.ingredients.length === 0
    ) {
      return constructor.bun.price * 2;
    } else {
      return 0;
    }
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
    <section className={style.burgerConstructor} ref={dropTarget}>
      {dataStatus.loading || dataStatus.error ? (
        <h1>{dataStatus.text}</h1>
      ) : (
        <>
          <ul className={style.crateBurger}>
            {typeof constructor.bun === "object" &&
              Object.keys(constructor.bun).length > 0 && (
                <ConstructorList
                  data={constructor.bun}
                  deleteIngredient={deleteIngredient}
                  type="top"
                />
              )}

            {constructor.ingredients.length > 0 &&
              constructor.ingredients.map((i) => (
                <ConstructorList
                  data={i}
                  key={i.keyId}
                  isLocked={false}
                  deleteIngredient={deleteIngredient}
                />
              ))}

            {typeof constructor.bun === "object" &&
              Object.keys(constructor.bun).length > 0 && (
                <ConstructorList
                  data={constructor.bun}
                  deleteIngredient={deleteIngredient}
                  type="bottom"
                />
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
            <Modal show={modal.order.show}>
              <OrderDetails number={modal.order.number} />
            </Modal>
          )}
        </>
      )}
    </section>
  );
}

export default BurgerConstructor;
