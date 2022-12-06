//importar las Actions
import {
  GET_PRODUCTS,
  FILTER_ALL,
  GET_PRODUCT_DETAIL,
} from "../Actions/actionsTypes.js";

const initialState = {
  // agregar o modificar los estados que vayan necesitando
  products: [],
  filterProducts: [],
  details: {},
  // loading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filterProducts: action.payload,
      };
    case FILTER_ALL:
      const allProducts = state.products;
      const { color, type, category } = action.payload;

      const filterProducts =
        category === "All"
          ? allProducts
          : allProducts.filter((p) => p.category === category);

      const filterProducts2 =
        type === "All"
          ? filterProducts
          : filterProducts.filter((p) => p.type.find((t) => t === type));

      const filterProducts3 =
        color === "All"
          ? filterProducts2
          : filterProducts2.filter((p) => p.color.find((c) => c === color));

      return {
        ...state,
        filterProducts: filterProducts3,
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
