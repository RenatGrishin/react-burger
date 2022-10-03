import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient.module.css";

function Ingredient(props) {
  return (
    <li className={style.card}>
      <img alt={props.name} className="mb-1" src={props.image} />
      <div className={style.price}>
        <p className="text text_type_digits-default mr-3">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small mt-1">{props.name}</p>
    </li>
  );
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Ingredient;
