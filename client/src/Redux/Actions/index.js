import axios from "axios";
import {
  GET_PRODUCTS,
  FILTER_BY_CATEGORY,
  GET_PRODUCT_DETAIL,
} from "./actionsTypes";

// cambiar el puerto del localhost al que usen localmente
export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/products/");
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}
export function FilterByCategory(payload) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: payload,
  };
}

export function getProductDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/products/${id}`);
    return dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: json.data,
    });
  };
}
