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
       // let color = "All";
      // let type = "All";
      // let category = "All";
      // if (
      //   action.payload === "Black" ||
      //   action.payload === "White" ||
      //   action.payload === "Blue" ||
      //   action.payload === "Pink"
      // ) {
      //   color = action.payload;
      // }
      // if (action.payload === "Tshirt" || action.payload === "Sweter") {
      //   type = action.payload;
      // }

      // if (action.payload !== "All") {
      //   category = action.payload;
      // }
      // category = action.payload;
      const filterProducts =
        // color === "All"
        //   ? allProducts
        //   : allProducts.filter((p) => p.color === color);
          category === "All"
          ? allProducts
          : allProducts.filter((p) => p.category === category);
          console.log(filterProducts, 'primer filtro category')
      const filterProducts2 =
        type === "All"
          ? filterProducts
          : filterProducts.filter((p) => p.type[0] === type);
          console.log(filterProducts2, 'segundo filtro type')
      const filterProducts3 =
        // category === "All"
        //   ? filterProducts2
        //   : filterProducts2.filter((p) => p.category === category);
          color === "All"
          ? filterProducts2
          : filterProducts2.filter((p) => p.color[0] === color);
          console.log(filterProducts3, 'primer filtro color')
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
