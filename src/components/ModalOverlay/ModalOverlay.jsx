import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { burgerPropTypes } from "../../prop-types";
import style from "./modalOverlay.module.css";
import { useEffect } from "react";

function ModalOverlay(props) {
  const modalsElement = document.querySelector("#modals");

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  function stopClick(e) {
    e.stopPropagation();
  }
  function escFunction() {
    props.onClose();
  }

  return ReactDOM.createPortal(
    <>
      {props.show ? (
        <div className={style.main} onClick={props.onClose}>
          <section className={style.modal} onClick={stopClick}>
            <div className={style.close} onClick={props.onClose}>
              <CloseIcon type="primary" />
            </div>
            {props.type === "order" ? (
              <OrderDetails />
            ) : (
              <IngredientDetails data={props.data} />
            )}
          </section>
        </div>
      ) : (
        ""
      )}
    </>,
    modalsElement
  );
}

ModalOverlay.propTypes = {
  type: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape(burgerPropTypes),
};

export default ModalOverlay;
