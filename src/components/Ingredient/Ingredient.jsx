import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { DND_INGREDIENT_ADD } from "../../services/actions.js";

import { burgerPropTypes } from "../../prop-types";
import style from "./ingredient.module.css";

function Ingredient(props) {
  const constructor = useSelector((store) => store.constructorEdit.constructor);
  const [count, setCount] = useState(0);

  let sumIngredients = 0;

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: props.data._id,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDrag) {
      dispatch({
        type: DND_INGREDIENT_ADD,
        ingredient: props.data,
      });
    }
  }, [isDrag]);

  useEffect(() => {
    if (props.data.type === "bun") {
      const bunCount = constructor.bun._id === props.data._id ? 2 : 0;
      setCount(bunCount);
    } else {
      const ingredientsCount = constructor.ingredients.filter(
        (elem) => elem._id === props.data._id
      ).length;
      setCount(ingredientsCount);
    }
  }, [constructor]);

  return (
    <li
      className={style.card}
      onClick={() => {
        props.openModal(props.data);
      }}
      draggable={true}
      ref={dragRef}
    >
      {count > 0 && <Counter count={count} size="default" />}

      <img alt={props.data.name} className="mb-1" src={props.data.image} />
      <div className={style.price}>
        <p className="text text_type_digits-default mr-3">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small mt-1">{props.data.name}</p>
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape(burgerPropTypes).isRequired,
};

export default Ingredient;
