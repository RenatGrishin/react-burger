import PropTypes from "prop-types";

import { burgerPropTypes } from "../../prop-types";
import style from "./ingredientDetails.module.css";

function IngredientDetails(props) {
  return (
    <>
      <div className={style.title}>
        <p className="text text_type_main-large mt-3">Детали ингредиента</p>
      </div>

      <img
        className="mt-15"
        alt={props.data.name}
        src={props.data.image_large}
      />
      <p className="text text_type_main-medium mt-4">{props.data.name}</p>
      <ul className={style.info}>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default mt-3">
            {props.data.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default mt-3">
            {props.data.carbohydrates}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default mt-3">{props.data.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default mt-3">
            {props.data.proteins}
          </p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.shape(burgerPropTypes).isRequired,
};

export default IngredientDetails;
