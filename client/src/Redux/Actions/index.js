import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";

// cambiar el puerto del localhost al que usen localmente
export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:5000/products/");
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}