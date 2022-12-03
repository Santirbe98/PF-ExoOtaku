import {
  //importar las Actions
  GET_PRODUCTS,
} from "../Actions";

const initialState = {
  // agregar o modificar los estados que vayan necesitando
  products: [],
  // details: {},
  // loading: true,
};

//agregar cada CASE de cada Actions
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        // loading: false,
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
