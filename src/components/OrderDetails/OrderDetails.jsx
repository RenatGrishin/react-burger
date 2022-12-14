import PropTypes, { func } from "prop-types";

import doneImg from "../../images/done.svg";

function OrderDetails(props) {
  return (
    <>
      <p className="text text_type_digits-large mt-20">{props.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15" alt="Done" src={doneImg} />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
  number: PropTypes.number,
};

export default OrderDetails;
