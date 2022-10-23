import { combineReducers } from 'redux';
import { 
    DATA_SUCCESS, 
    DATA_REQUEST, 
    DATA_ERROR, 
    CONSTRUCTOR_INGREDIENT_REQUEST, 
    CONSTRUCTOR_INGREDIENT_SUCCESS, 
    CONSTRUCTOR_INGREDIENT_ERROR,
    CONSTRUCTOR_INGREDIENT_INITIAL,
    CONSTRUCTOR_INGREDIENT_PRICE_SET,
    MODAL_INGREDIENT_OPEN,
    MODAL_INGREDIENT_CLOSE,
    MODAL_ORDER_SET,
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE,
 } from './actions.js';
import { initialState } from './state'



const dataList = (state = initialState, action) => {
    switch (action.type){
        case DATA_SUCCESS:{
            return {
                ...state,
                data: action.data,
                dataStatus: {
                    ...state.dataStatus,
                    loading: false,
                    error: false,
                }
            }
        }
        case DATA_REQUEST:{
            return {
                ...state,
                dataStatus: {
                    text: "Загрузка ингредиентов",
                    loading: true,
                    error: false
                }
            }
        }
        case DATA_ERROR: {
            return {
                ...state,
                dataStatus: {
                    text: "Мы не можем найти ингредиенты :(",
                    loading: false,
                    error: true,
                }
            }
        }
        default: {
            return state;
        }
    }
}

const constructorEdit = (state = initialState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_INGREDIENT_PRICE_SET: {
            return {
                ...state,
                constructor: {
                    ...state.constructor,
                    price: action.price
                }
            }
        }
        case CONSTRUCTOR_INGREDIENT_INITIAL: {
            return {
                ...state,
                constructor: {
                    ...state.constructor,
                    bun: action.bun,
                    ingredients: action.ingredients
                }
            }
        }
        default: {
            return state;
        }
    }
}

const modalWindow = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_INGREDIENT_OPEN: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ingredient:{
                        show: true,
                        data: action.ingredient
                    }
                }
            }
        }
        case MODAL_INGREDIENT_CLOSE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ingredient:{
                        show: false,
                        data: {}
                    }
                }
            }
        }
        case MODAL_ORDER_OPEN: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    order:{
                        ...state.modal.order,
                        show: true,
                    }
                }
            }
        }
        case MODAL_ORDER_CLOSE: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    order:{
                        ...state.modal.order,
                        show: false,
                    }
                }
            }
        }
        case MODAL_ORDER_SET: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    order:{
                        ...state.modal.order,
                        number: action.number,
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({dataList, constructorEdit, modalWindow});