import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import style from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalsElement = document.querySelector("#modals");

function Modal(props) {
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

  return ReactDOM.createPortal(
    <>
      {props.show && (
        <div className={style.modalWindow}>
          <ModalOverlay
            onClose={() => {
              props.onClose(false);
            }}
          />
          <section onClick={stopClick} className={style.modal}>
            <div
              className={style.close}
              onClick={() => {
                props.onClose(false);
              }}
            >
              <CloseIcon type="primary" />
            </div>
            {props.children}
          </section>
        </div>
      )}
    </>,
    modalsElement
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
