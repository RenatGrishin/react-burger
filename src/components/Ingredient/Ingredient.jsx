import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { burgerPropTypes } from "../../prop-types";
import style from "./ingredient.module.css";

function Ingredient(props) {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <li className={style.card} onClick={toggleModal}>
      <img alt={props.data.name} className="mb-1" src={props.data.image} />
      <div className={style.price}>
        <p className="text text_type_digits-default mr-3">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small mt-1">{props.data.name}</p>
      {modal && (
        <Modal show={modal} onClose={toggleModal}>
          <IngredientDetails data={props.data} />
        </Modal>
      )}
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape(burgerPropTypes).isRequired,
};

export default Ingredient;
