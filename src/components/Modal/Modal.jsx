import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import {
  MODAL_INGREDIENT_CLOSE,
  MODAL_ORDER_CLOSE,
} from "../../services/actions.js";

import style from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalsElement = document.querySelector("#modals");

function Modal(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  function escFunction(e) {
    if (e.code === "Escape") {
      props.onClose(false);
    }
  }

  function stopClick(e) {
    e.stopPropagation();
  }

  function onClose() {
    dispatch({
      type: MODAL_INGREDIENT_CLOSE,
    });
    dispatch({
      type: MODAL_ORDER_CLOSE,
    });
  }

  return ReactDOM.createPortal(
    <div className={style.modalWindow}>
      <ModalOverlay
        onClose={() => {
          onClose();
        }}
      />
      <section onClick={stopClick} className={style.modal}>
        <div
          className={style.close}
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon type="primary" />
        </div>
        {props.children}
      </section>
    </div>,
    modalsElement
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
