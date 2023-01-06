import axios from "axios";
import {
  GET_PRODUCTS,
  FILTER_ALL,
  GET_PRODUCT_DETAIL,
  ORDER_BY_PRICE,
  ORDER_DETAIL,
  GET_USER_CREDENTIALS,
  CUSTOMER_BY_EMAIL,
  CUSTOMER_ORDERS,
  GET_ALL_ORDERS,
  DELETE_ORDER,
  UPDATE_STATUS,
  GET_USERS,
  DELETE_USER,
  ORDER_RANK,
  ORDER_BY_DATE,
} from "./actionsTypes";

axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = 'https://exo-otaku.up.railway.app/'

export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get(`/products`);

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
    let json = await axios.get(`/products/${id}`);
    return dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: json.data,
    });
  };
}

export function postProduct(body) {
  return async function () {
    try {
      var json = await axios.post(`/products`, body);

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
export function orderByRank() {
  return {
    type: ORDER_RANK,
  };
}
export function orderByDate() {
  return {
    type: ORDER_BY_DATE,
  };
}

export function payment({ cartItems, userId, name, email }) {
  axios
    .post(`/payment/create-checkout-session`, {
      cartItems,
      userId,
      name,
      email,
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
        `/payment/checkout-success?session_id=${session_id}`
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

export function postCustomer(payload) {
  return async function (dispatch) {
    console.log(payload);
    var response;
    try {
      response = await axios.post("/customer/", payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function userCredential(payload) {
  return {
    type: GET_USER_CREDENTIALS,
    payload: payload,
  };
}

export function chkcustomer(email) {
  return async function (dispatch) {
    let json = await axios.get(`/customer/${email}`);
    return dispatch({
      type: CUSTOMER_BY_EMAIL,
      payload: json.data,
    });
  };
}

export function customerOrders(id) {
  return async function (dispatch) {
    let json = await axios.get(`/orders/${id}`);
    return dispatch({
      type: CUSTOMER_ORDERS,
      payload: json.data,
    });
  };
}

export function getAllOrders(status) {
  return async function (dispatch) {
    let json;
    if (status) {
      json = await axios.get(`/orders?status=${status}`);
    } else {
      json = await axios.get(`/orders/`);
    }
    return dispatch({
      type: GET_ALL_ORDERS,
      payload: json.data,
    });
  };
}

export function deleteOrder(id) {
  return async function (dispatch) {
    let json = await axios.delete(`/orders?id=${id}`);
    return dispatch({
      type: DELETE_ORDER,
      payload: json.data,
    });
  };
}

export function modifyStatusORder({ id, state }) {
  return async function (dispatch) {
    let json = await axios.put(`/orders?id=${id}`, {
      status: state,
    });
    return dispatch({
      type: UPDATE_STATUS,
      payload: json.data,
    });
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    let json = await axios.get("/customer");
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
}

export function updateAdmin({ id, isadmin }) {
  return async function (dispatch) {
    let json = await axios.put("/customer", {
      id,
      isadmin,
    });
    return dispatch({
      type: UPDATE_STATUS,
      payload: json.data,
    });
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    let json = await axios.delete(`/customer/${id}`);
    return dispatch({
      type: DELETE_USER,
      payload: json.data,
    });
  };
}
