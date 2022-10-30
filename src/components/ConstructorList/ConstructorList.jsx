import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { burgerPropTypesConstructorList } from "../../prop-types";

import {
  CONSTRUCTOR_INGREDIENT_REPLACE,
  DND_REPLACE_IT_SET,
} from "../../services/actions.js";

import style from "./constructorList.module.css";

export default function ConstructorList(props) {
  const constructor = useSelector((store) => store.constructorEdit.constructor);
  const dnd = useSelector((state) => state.dndReducer.dnd);

  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredientList",
    item: props.data.keyId,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const [, dropTarget] = useDrop({
    accept: "ingredientList",
    drop() {
      replaceIngredients();
    },
  });

  useEffect(() => {
    if (isDrag) {
      getIngredient();
    }
  }, [isDrag]);

  function getIngredient() {
    dispatch({
      type: DND_REPLACE_IT_SET,
      id: props.data.sortNum,
    });
  }

  function replaceIngredients() {
    const indexIt = constructor.ingredients.findIndex(
      (elem) => elem.sortNum === dnd.replace.it
    );
    const indexOn = constructor.ingredients.findIndex(
      (elem) => elem.sortNum === props.data.sortNum
    );

    const newIngredientsArr = JSON.parse(
      JSON.stringify(constructor.ingredients)
    );

    const positionIt = newIngredientsArr[indexIt].sortNum;
    const positionOn = newIngredientsArr[indexOn].sortNum;

    newIngredientsArr[indexIt].sortNum = positionOn;
    newIngredientsArr[indexOn].sortNum = positionIt;

    newIngredientsArr.sort(function (a, b) {
      if (a.sortNum > b.sortNum) {
        return 1;
      }
      if (a.sortNum < b.sortNum) {
        return -1;
      }
      return 0;
    });

    dispatch({
      type: CONSTRUCTOR_INGREDIENT_REPLACE,
      ingredients: newIngredientsArr,
    });
  }

  let typeText = "";
  if (props.type === "top") {
    typeText = " (верх)";
  } else if (props.type === "bottom") {
    typeText = " (низ)";
  }

  const isBun = props.data.type === "bun" ? true : false;
  return (
    <li className={style.list} ref={!isBun ? dragRef : null}>
      {!isBun && (
        <div className="mr-1">
          <DragIcon type="primary" />{" "}
        </div>
      )}
      <div className={style.listWidth} ref={!isBun ? dropTarget : null}>
        <ConstructorElement
          type={props.type}
          isLocked={isBun ? true : false}
          text={props.data.name + typeText}
          price={props.data.price}
          thumbnail={props.data.image}
          handleClose={() => {
            props.deleteIngredient(props.data.keyId);
          }}
          draggable={isBun ? false : true}
        />
      </div>
    </li>
  );
}

ConstructorList.propTypes = {
  data: PropTypes.shape(burgerPropTypesConstructorList).isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  type: PropTypes.string,
};
