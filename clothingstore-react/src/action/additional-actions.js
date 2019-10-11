import axios from "axios";
import { GET_PRODUCERS, GET_TYPES, GET_COUNTRIES } from "./types";

export const getProducerList = () => async dispatch => {
  const res = await axios.get("/producer/all");
  dispatch({
    type: GET_PRODUCERS,
    payload: res.data
  });
};

export const getTypeList = () => async dispatch => {
  const res = await axios.get("/type/all");
  dispatch({
    type: GET_TYPES,
    payload: res.data
  });
};

export const getEnCountryList = () => async dispatch => {
  const res = await axios.get("/en/country/all");
  dispatch({
    type: GET_COUNTRIES,
    payload: res.data
  });
};

export const getRuCountryList = () => async dispatch => {
  const res = await axios.get("/country/all");
  dispatch({
    type: GET_COUNTRIES,
    payload: res.data
  });
};
