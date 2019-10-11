import axios, { post } from "axios";
import {
  GET_ITEMS,
  GET_ITEM,
  GET_ERRORS,
  DELETE_ITEM,
  GET_IMAGES,
  DELETE_IMAGE,
  GET_LIKES,
  ADD_ONE_LIKE,
  DELETE_ONE_LIKE,
  ADD_IMAGES
} from "./types";
import { cleanUpDiv } from "../components/ru/navbar-components/add-update-item/add-item-image/drag-and-drop";

export const getItemList = (
  url,
  pageNumber,
  elementsOnPage,
  sort,
  ask_desk,
  history
) => async dispatch => {
  try {
    const res = await axios.get(
      `${url}?page=${pageNumber}&size=${elementsOnPage}&sort=${sort},${ask_desk}`
    );
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getItem = id => async dispatch => {
  const res = await axios.get("/catalog/full/" + id);
  dispatch({
    type: GET_ITEM,
    payload: res.data
  });
};

export const addNewItem = (newItem, history, url) => async dispatch => {
  try {
    await axios.post("/catalog/add", newItem);
    history.push(url);
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

export const updateItem = (item, id, history, url) => async dispatch => {
  try {
    await axios.put(`/catalog/update/${id}`, item);
    history.push(url);
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

export const deleteItem = (id, history, url) => async dispatch => {
  if (window.confirm("Are you shure want to delete this item")) {
    await axios.delete(`/catalog/delete/${id}`);
    history.push(url);
    dispatch({
      type: DELETE_ITEM,
      payload: id
    });
  }
};

export const uploadItemImage = (file, id) => async dispatch => {
  const url = `/catalog/save/images/${id}`;
  const formData = new FormData();
  for (let i = 0; i < file.length; i++) {
    formData.append("file", file[i]);
  }
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  const res = await axios.post(url, formData, config);
  cleanUpDiv("gallery");

  var timerId = setInterval(function() {
    dispatch({
      type: ADD_IMAGES,
      payload: res.data
    });
  }, 500);

  setTimeout(function() {
    clearInterval(timerId);
  }, 5000);
};

export const getItemImages = id => async dispatch => {
  const res = await axios.get("/catalog/images/" + id);
  dispatch({
    type: GET_IMAGES,
    payload: res.data
  });
};

export const deleteImage = id => async dispatch => {
  if (window.confirm("Are you shure want to delete this item")) {
    await axios.delete(`/catalog/images/${id}`);
    dispatch({
      type: DELETE_IMAGE,
      payload: id
    });
  }
};

export const addItemLike = (customer_id, clothes_id) => async dispatch => {
  const res = await axios.post(
    `/likes/new/customer/${customer_id}/clothes/${clothes_id}`
  );
  dispatch({
    type: GET_LIKES,
    payload: res.data
  });
  dispatch({
    type: ADD_ONE_LIKE,
    payload: clothes_id
  });
};

export const getItemsLikes = customer_id => async dispatch => {
  const res = await axios.get(`/likes/customer/${customer_id}`);
  dispatch({
    type: GET_LIKES,
    payload: res.data
  });
};

export const deleteItemLike = (customer_id, clothes_id) => async dispatch => {
  const res = await axios.delete(
    `/likes/delete/customer/${customer_id}/clothes/${clothes_id}`
  );
  dispatch({
    type: GET_LIKES,
    payload: res.data
  });
  dispatch({
    type: DELETE_ONE_LIKE,
    payload: clothes_id
  });
};
