export const initialState = {
  data: [],
  dataStatus: {
    text: "",
    loading: false,
    error: false,
  },

  constructor: {
    bun: {},
    ingredients: [],
    price: 0,
  },

  modal: {
    ingredient: {
      show: false,
      data: {},
    },
    order: {
      show: false,
      number: 0,
    },
  },

  dnd: {
    ingredient: {},
    replace: {
      it: null,
    }
  },
  
  ingredientTab: "",
};
