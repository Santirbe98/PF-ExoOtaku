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
    case FILTER_ALL:
      const allProducts = state.products;
      const {color, type, category} = action.payload;
      // const filterProducts = allProducts.map(prod=>{
      //   if(prod.color === color || prod.type === type || prod.category === category){
      //     return {
      //      prod
      //     };
      //   }
      // })
      const filterProducts =
        color === "all"
          ? allProducts
          : allProducts.filter((p) => p.color === color);
      const filterProducts2 =
        type === "all"
          ? filterProducts
          : filterProducts.filter((p) => p.type === type);
      const filterProducts3 =
        category === "all"
          ? filterProducts2
          : filterProducts2.filter((p) => p.category === category);
      return {
        ...state,
        products: filterProducts3,
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
