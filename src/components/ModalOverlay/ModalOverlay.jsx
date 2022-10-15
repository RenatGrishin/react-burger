import PropTypes from "prop-types";

import style from "./modalOverlay.module.css";

function ModalOverlay(props) {
  return <div onClick={props.onClose} className={style.main}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
