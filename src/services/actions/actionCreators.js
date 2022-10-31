import {
    DATA_SUCCESS,
    DATA_REQUEST,
    DATA_ERROR,
    MODAL_ORDER_SET,
    MODAL_ORDER_OPEN,
  } from "../actions.js";

import { connectBurgerApi, setOrderApi } from "../../utils/burger-api.js";

export const getIngredientsThunk = (dispatch) => {
    dispatch({ type: DATA_REQUEST });
    connectBurgerApi()
    .then((data) => {
        dispatch({ type: DATA_SUCCESS, data: data.data });
    })
    .catch((error) => {
        dispatch({ type: DATA_ERROR });
        console.error(error);
    });
}

export const getOrderThunk = (dispatch, ingredientsList) => {
    setOrderApi(ingredientsList).then((data) => {
        dispatch({ type: MODAL_ORDER_SET, number: data.order.number });
        dispatch({ type: MODAL_ORDER_OPEN });
      }).catch((error) => {
        console.error(error);
    });
}