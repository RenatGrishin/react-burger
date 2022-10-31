import { combineReducers } from "redux";
import {
  DATA_SUCCESS,
  DATA_REQUEST,
  DATA_ERROR,
  CONSTRUCTOR_INGREDIENT_INITIAL,
  CONSTRUCTOR_INGREDIENT_PRICE_SET,
  CONSTRUCTOR_INGREDIENT_ADD_BUN,
  CONSTRUCTOR_INGREDIENT_ADD_INGREDIENTS,
  CONSTRUCTOR_INGREDIENT_DELETE_INGREDIENTS,
  CONSTRUCTOR_INGREDIENT_REPLACE,
  MODAL_INGREDIENT_OPEN,
  MODAL_INGREDIENT_CLOSE,
  MODAL_ORDER_SET,
  MODAL_ORDER_OPEN,
  MODAL_ORDER_CLOSE,
  DND_INGREDIENT_ADD,
  DND_REPLACE_IT_SET,
  INGREDIENT_TAB_SET,
} from "./actions.js";
import { initialState } from "./state";

import { connectBurgerApi } from "../utils/burger-api.js";

const dataList = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
        dataStatus: {
          ...state.dataStatus,
          loading: false,
          error: false,
        },
      };
    }
    case DATA_REQUEST: {
      return {
        ...state,
        dataStatus: {
          text: "Загрузка ингредиентов",
          loading: true,
          error: false,
        },
      };
    }
    case DATA_ERROR: {
      return {
        ...state,
        dataStatus: {
          text: "Мы не можем найти ингредиенты :(",
          loading: false,
          error: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const constructorEdit = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_INGREDIENT_PRICE_SET: {
      return {
        ...state,
        constructor: {
          ...state.constructor,
          price: action.price,
        },
      };
    }
    case CONSTRUCTOR_INGREDIENT_INITIAL: {
      return {
        ...state,
        constructor: {
          ...state.constructor,
          bun: action.bun,
          ingredients: action.ingredients,
        },
      };
    }
    case CONSTRUCTOR_INGREDIENT_ADD_BUN: {
      return {
        ...state,
        constructor: {
          ...state.constructor,
          bun: action.bun,
        },
      };
    }
    case CONSTRUCTOR_INGREDIENT_ADD_INGREDIENTS: {
      return {
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: [
            ...state.constructor.ingredients,
            action.ingredient
          ]
        },
      };
    }
    case CONSTRUCTOR_INGREDIENT_DELETE_INGREDIENTS: {
      return{
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: action.ingredients
        },
      }
    }
    case CONSTRUCTOR_INGREDIENT_REPLACE: {
      return{
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: action.ingredients
        },
      }
    }
    default: {
      return state;
    }
  }
};

const modalWindow = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_INGREDIENT_OPEN: {
      return {
        ...state,
        modal: {
          ...state.modal,
          ingredient: {
            show: true,
            data: action.ingredient,
          },
        },
      };
    }
    case MODAL_INGREDIENT_CLOSE: {
      return {
        ...state,
        modal: {
          ...state.modal,
          ingredient: {
            show: false,
            data: {},
          },
        },
      };
    }
    case MODAL_ORDER_OPEN: {
      return {
        ...state,
        modal: {
          ...state.modal,
          order: {
            ...state.modal.order,
            show: true,
          },
        },
      };
    }
    case MODAL_ORDER_CLOSE: {
      return {
        ...state,
        modal: {
          ...state.modal,
          order: {
            ...state.modal.order,
            show: false,
          },
        },
      };
    }
    case MODAL_ORDER_SET: {
      return {
        ...state,
        modal: {
          ...state.modal,
          order: {
            ...state.modal.order,
            number: action.number,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

const dndReducer = (state=initialState, action) => {
  switch (action.type){
    case DND_INGREDIENT_ADD:{
      return {
        ...state,
        dnd:{
          ...state.dnd,
          ingredient: action.ingredient,
        }
      }
    }
    case DND_REPLACE_IT_SET:{
      return {
        ...state,
        dnd:{
          ...state.dnd,
          replace:{
            ...state.dnd.replace,
            it: action.id
          }
        }
      }
    }
    default: {
      return state;
    }
  }
}

const ingredientTabReducer = (state=initialState, action) => {
  switch (action.type){
    case INGREDIENT_TAB_SET:{
      return {
        ...state,
        ingredientTab: action.tab
      }
    }
    default: {
      return state;
    }
  }
}



export const rootReducer = combineReducers({
  dataList,
  constructorEdit,
  modalWindow,
  dndReducer,
  ingredientTabReducer
});
