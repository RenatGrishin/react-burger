import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { connectBurgerApi } from "../../utils/burger-api.js";
import {
  DATA_SUCCESS,
  DATA_REQUEST,
  DATA_ERROR,
} from "../../services/actions.js";

import BurgerTabs from "../BurgerTabs/BurgerTabs";
import Ingredient from "../Ingredient/Ingredient";

import style from "./burgerIngredients.module.css";

function BurgerIngredients() {
  const data = useSelector((store) => store.dataList.data);
  const dataStatus = useSelector((store) => store.dataList.dataStatus);
  const modal = useSelector((state) => state.modalWindow.modal);

  const dispatch = useDispatch();

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

  const bun = data.filter((arr) => arr.type === "bun");
  const mains = data.filter((arr) => arr.type === "main");
  const sauces = data.filter((arr) => arr.type === "sauce");

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
        </>
      )}
    </section>
  );
}

export default BurgerIngredients;
