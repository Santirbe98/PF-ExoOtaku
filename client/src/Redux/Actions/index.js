import axios from "axios";
import {
  GET_PRODUCTS,
  FILTER_ALL,
  GET_PRODUCT_DETAIL,
  ORDER_BY_PRICE,
  ORDER_DETAIL,
} from "./actionsTypes";
const urlBack = process.env.REACT_APP_URL;

// cambiar el puerto del localhost al que usen localmente
export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get(`${urlBack}products/`);
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
    let json = await axios.get(`${urlBack}products/${id}`);
    return dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: json.data,
    });
  };
}

export function postProduct(body) {
  return async function () {
    try {
      var json = await axios.post(`${urlBack}products/`, body);
      return json;
    } catch (error) {
      console.error({ error: error.message });
    }
  };
}
export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload: payload,
  };
}

export function payment({ cartItems, userId }) {
  axios
    .post(`${urlBack}payment/create-checkout-session`, {
      cartItems,
      userId,
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err));
}

export function getCheckout(session_id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `${urlBack}payment/checkout-success?session_id=${session_id}`
      );
      return dispatch({
        type: ORDER_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.error({ error: error.message });
    }
  };
}
