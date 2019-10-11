import axios from "axios";
import {
  GET_ADMIN_ELEMENTS,
  GET_TOP_NAMES,
  GET_TOP_LIKES,
  GET_TOP_TYPES,
  GET_DAY_PRICE,
  GET_WEEK_ONLINE
} from "./types";

export const getElements = (
  pageNumber,
  elementsOnPage,
  url
) => async dispatch => {
  const res = await axios.get(
    `/${url}?page=${pageNumber}&size=${elementsOnPage}`
  );
  dispatch({
    type: GET_ADMIN_ELEMENTS,
    payload: res.data
  });
};

export const getTopClothesNames = () => async dispatch => {
  const res = await axios.get(`/catalog/top/names`);
  dispatch({
    type: GET_TOP_NAMES,
    payload: res.data
  });
};

export const getTopClothesLikes = () => async dispatch => {
  const res = await axios.get(`/catalog/top/likes`);
  dispatch({
    type: GET_TOP_LIKES,
    payload: res.data
  });
};

export const getTopClothesTypes = () => async dispatch => {
  const res = await axios.get(`/catalog/top/types`);
  dispatch({
    type: GET_TOP_TYPES,
    payload: res.data
  });
};

export const getLast10DaysPriceStat = () => async dispatch => {
  const res = await axios.get(`/statistic/total-price`);
  dispatch({
    type: GET_DAY_PRICE,
    payload: res.data
  });
};

export const getWeekOnline = () => async dispatch => {
  const res = await axios.get(`/statistic/week-online`);
  dispatch({
    type: GET_WEEK_ONLINE,
    payload: res.data
  });
};
