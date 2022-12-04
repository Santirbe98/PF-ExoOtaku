//importar las Actions
import {
  GET_PRODUCTS,
  FILTER_BY_CATEGORY,
  GET_PRODUCT_DETAIL,
} from "../Actions/actionsTypes.js";

const initialState = {
  // agregar o modificar los estados que vayan necesitando
  products: [],
  filterProducts: [],
  details: {},
  // loading: true,
};

//agregar cada CASE de cada Actions
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filterProducts: action.payload,
        // loading: false,
      };
    case FILTER_BY_CATEGORY:
      const allProducts = state.products;
      const filterProducts =
        action.payload === "all"
          ? allProducts
          : allProducts.filter((p) => p.category === action.payload);
      return {
        ...state,
        products: filterProducts,
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        details: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
