import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { connectBurgerApi } from "../../utils/burger-api.js";
import {
  DATA_SUCCESS,
  DATA_REQUEST,
  DATA_ERROR,
  INGREDIENT_TAB_SET,
  MODAL_INGREDIENT_CLOSE,
} from "../../services/actions.js";

import { MODAL_INGREDIENT_OPEN } from "../../services/actions.js";
import { useInView } from "react-intersection-observer";

import BurgerTabs from "../BurgerTabs/BurgerTabs";
import Ingredient from "../Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import style from "./burgerIngredients.module.css";

function BurgerIngredients() {
  const data = useSelector((store) => store.dataList.data);
  const dataStatus = useSelector((store) => store.dataList.dataStatus);
  const modal = useSelector((state) => state.modalWindow.modal);
  const ingredientTab = useSelector(
    (state) => state.ingredientTabReducer.ingredientTab
  );

  const dispatch = useDispatch();

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [fillingsRef, inViewFillings] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    dispatch({ type: DATA_REQUEST });
    connectBurgerApi()
      .then((data) => {
        dispatch({ type: DATA_SUCCESS, data: data.data });
      })
      .catch((error) => {
        dispatch({ type: DATA_ERROR });
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (inViewBuns) {
      dispatch({ type: INGREDIENT_TAB_SET, tab: "buns" });
    } else if (inViewSauces) {
      dispatch({ type: INGREDIENT_TAB_SET, tab: "sauces" });
    } else if (inViewFillings) {
      dispatch({ type: INGREDIENT_TAB_SET, tab: "fillings" });
    }
  }, [inViewBuns, inViewFillings, inViewSauces]);

  const bun = data.filter((arr) => arr.type === "bun");
  const mains = data.filter((arr) => arr.type === "main");
  const sauces = data.filter((arr) => arr.type === "sauce");

  function openModal(data) {
    dispatch({
      type: MODAL_INGREDIENT_OPEN,
      ingredient: data,
    });
  }
  function closeModal() {
    dispatch({
      type: MODAL_INGREDIENT_CLOSE,
    });
  }

  return (
    <section className={style.burgerIngredients}>
      {dataStatus.loading || dataStatus.error ? (
        <h1>{dataStatus.text}</h1>
      ) : (
        <>
          <p className="text text_type_main-large pt-10">Соберите бургер</p>
          <BurgerTabs />

          <section className={style.ingredients}>
            <div>
              <p className="text text_type_main-medium">Булки</p>
              <ul className={style.ingredientsList} ref={bunsRef}>
                {bun.map((elem) => (
                  <Ingredient
                    key={elem._id}
                    data={elem}
                    openModal={openModal}
                  />
                ))}
              </ul>
            </div>

            <div>
              <p className="text text_type_main-medium">Соусы</p>
              <ul className={style.ingredientsList} ref={saucesRef}>
                {sauces.map((elem) => (
                  <Ingredient
                    key={elem._id}
                    data={elem}
                    openModal={openModal}
                  />
                ))}
              </ul>
            </div>

            <div>
              <p className="text text_type_main-medium">Начинки</p>
              <ul className={style.ingredientsList} ref={fillingsRef}>
                {mains.map((elem) => (
                  <Ingredient
                    key={elem._id}
                    data={elem}
                    openModal={openModal}
                  />
                ))}
              </ul>
            </div>
          </section>
          {modal.ingredient.show && (
            <Modal show={modal.ingredient.show} onClose={closeModal}>
              <IngredientDetails data={modal.ingredient.data} />
            </Modal>
          )}
        </>
      )}
    </section>
  );
}

export default BurgerIngredients;
