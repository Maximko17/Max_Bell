import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../security-utils/setJWTToken";
import jwt_decode from "jwt-decode";
import { getCookie } from "../cookie-utils/language-cookie";

export const createNewCustomer = (
  firstName,
  username,
  password,
  confirmPassword,
  gender,
  photo,
  history
) => async dispatch => {
  try {
    const url = "/customer/register";
    const formData = new FormData();
    formData.append("file", photo);
    formData.append(
      "customer",
      new Blob(
        [
          JSON.stringify({
            firstName: firstName,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            gender: gender
          })
        ],
        {
          type: "application/json"
        }
      )
    );
    const config = {
      headers: {
        "Content-Type": undefined
      }
    };
    await axios.post(url, formData, config);

    history.push("/login");
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

export const updateCustomer = (
  updateCustomer,
  photo,
  history
) => async dispatch => {
  try {
    const url = "/customer/edit";
    const formData = new FormData();
    formData.append("file", photo);
    formData.append(
      "customer",
      new Blob(
        [
          JSON.stringify({
            id: updateCustomer.id,
            firstName: updateCustomer.firstName,
            prevUsername: updateCustomer.prevUsername,
            username: updateCustomer.username,
            gender: updateCustomer.gender,
            photo: updateCustomer.photo,
            newPassword: updateCustomer.newPassword,
            prevPassword: updateCustomer.prevPassword,
            confirmPassword: updateCustomer.confirmPassword
          })
        ],
        {
          type: "application/json"
        }
      )
    );
    const config = {
      headers: {
        "Content-Type": undefined
      }
    };
    await axios.put(url, formData, config);

    history.push("/login");
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

export const login = (loginRequest, history) => async dispatch => {
  try {
    const res = await axios.post("/customer/login", loginRequest);

    const { token } = res.data;

    localStorage.setItem("jwtToken", token);

    setJWTToken(token);

    const decoded = jwt_decode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
    history.push(getCookie("LANGUAGE") ? "/en/order" : "/order");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const OAuthlogin = (history, access_token) => async dispatch => {
  try {
    console.log(access_token);

    localStorage.setItem("jwtToken", access_token);

    setJWTToken(access_token);

    const decoded = jwt_decode(access_token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
    history.push("/order");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
