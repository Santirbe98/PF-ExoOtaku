import {
  GET_PRODUCTS,
  FILTER_ALL,
  GET_PRODUCT_DETAIL,
  ORDER_BY_PRICE,
  ORDER_DETAIL,
} from "../Actions/actionsTypes.js";

const initialState = {
  products: [],
  filterProducts: [],
  details: {},
  orderdetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_DETAIL:
      return {
        ...state,
        orderdetail: action.payload,
      };

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
    case ORDER_BY_PRICE:
      const products = state.filterProducts;
      const orderProduct =
        action.payload === "Asc"
          ? products.sort((a, b) => a.price - b.price)
          : products.sort((a, b) => b.price - a.price);
      return {
        ...state,
        filterProducts: orderProduct,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
