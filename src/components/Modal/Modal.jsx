import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

import style from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function Modal(props) {
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  function escFunction() {
    props.onClose();
  }

  function stopClick(e) {
    e.stopPropagation();
  }

  return (
    <>
      {props.show && (
        <ModalOverlay onClose={props.onClose}>
          <section onClick={stopClick} className={style.modal}>
            <div className={style.close} onClick={props.onClose}>
              <CloseIcon type="primary" />
            </div>
            {props.children}
          </section>
        </ModalOverlay>
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Modal;
