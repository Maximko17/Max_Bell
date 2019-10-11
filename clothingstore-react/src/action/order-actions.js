import axios from "axios";
import {
  GET_ORDER,
  GET_ERRORS,
  DELETE_ALL_FROM_ORDER,
  DELETE_ITEM_FROM_ORDER,
  GET_ORDER_BY_UNIQUE_ID,
  GET_CUSTOMER_ORDERS
} from "./types";
import { getCookie } from "../cookie-utils/language-cookie";

export const addInOrder = (item, history) => async dispatch => {
  await axios.post(`/order/addInOrder`, item);
  history.push(getCookie("LANGUAGE") ? "/en/order" : "/order");
};

export const getOrder = () => async dispatch => {
  try {
    const res = await axios.get(`/order`);
    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (error) {
    window.location.reload();
  }
};

export const getCustomerOrders = () => async dispatch => {
  const res = await axios.get(`/order/customer/all`);
  dispatch({
    type: GET_CUSTOMER_ORDERS,
    payload: res.data
  });
};

export const getOrderByUniqueId = id => async dispatch => {
  const res = await axios.get(`/order/${id}`);
  dispatch({
    type: GET_ORDER_BY_UNIQUE_ID,
    payload: res.data
  });
};

export const deleteAllFromOrder = (order, history) => async dispatch => {
  await axios.delete(`/order/delete/all`, {
    data: order
  });
  history.push(getCookie("LANGUAGE") ? "/en/order" : "/order");
  console.log(order.id);
  dispatch({
    type: DELETE_ALL_FROM_ORDER,
    payload: order.id
  });
};

export const deleteItemFromOrder = (order, id, history) => async dispatch => {
  await axios.delete(`/order/delete/${id}`, {
    data: order
  });
  history.push(getCookie("LANGUAGE") ? "/en/order" : "/order");
  dispatch({
    type: DELETE_ITEM_FROM_ORDER,
    payload: id
  });
};

export const saveOrderDetails = (orderDetails, history) => async dispatch => {
  try {
    await axios.post(`/order/saveOrderDetails`, orderDetails);
    history.push(
      history.push(getCookie("LANGUAGE") ? "/en/prevOrders" : "/prevOrders")
    );

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
