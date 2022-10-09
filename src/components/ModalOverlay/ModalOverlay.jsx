import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import style from "./modalOverlay.module.css";

const modalsElement = document.querySelector("#modals");

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div onClick={props.onClose} className={style.main}>
      {props.children}
    </div>,
    modalsElement
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
