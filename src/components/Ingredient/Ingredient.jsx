import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";

import {
  MODAL_INGREDIENT_OPEN,
  MODAL_INGREDIENT_CLOSE,
} from "../../services/actions.js";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { burgerPropTypes } from "../../prop-types";
import style from "./ingredient.module.css";

function Ingredient(props) {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modalWindow.modal);

  function toggleModal() {
    if (modal.ingredient.show) {
      dispatch({
        type: MODAL_INGREDIENT_CLOSE,
        ingredient: props.data,
      });
    } else {
      dispatch({
        type: MODAL_INGREDIENT_OPEN,
        ingredient: props.data,
      });
    }
  }

  return (
    <li className={style.card} onClick={toggleModal}>
      <img alt={props.data.name} className="mb-1" src={props.data.image} />
      <div className={style.price}>
        <p className="text text_type_digits-default mr-3">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small mt-1">{props.data.name}</p>
      {modal.ingredient.show && modal.ingredient.data._id === props.data._id && (
        <Modal show={modal.ingredient.show} onClose={toggleModal}>
          <IngredientDetails data={modal.ingredient.data} />
        </Modal>
      )}
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape(burgerPropTypes).isRequired,
};

export default Ingredient;
