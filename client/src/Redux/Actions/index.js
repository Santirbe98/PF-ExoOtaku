import axios from "axios";
import {
  GET_PRODUCTS,
  FILTER_ALL,
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
export function filterAll(payload) {
  return {
    type: FILTER_ALL,
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

export function postProduct(body){
  return async function(){
    try {
      var json = await axios.post("http://localhost:3001/products/", body)
      return json
    } catch (error) {
      console.error({error: error.message})
    }
  }
}
