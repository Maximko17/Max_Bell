import {
  GET_ADMIN_ELEMENTS,
  GET_TOP_NAMES,
  GET_TOP_LIKES,
  GET_TOP_TYPES,
  GET_DAY_PRICE,
  GET_WEEK_ONLINE
} from "../action/types";

const initialState = {
  elements: {},
  top_names: [],
  top_likes: [],
  top_types: [],
  day_price: [],
  week_online: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN_ELEMENTS:
      return {
        ...state,
        elements: action.payload
      };

    case GET_TOP_NAMES:
      return {
        ...state,
        top_names: action.payload
      };

    case GET_TOP_LIKES:
      return {
        ...state,
        top_likes: action.payload
      };

    case GET_TOP_TYPES:
      return {
        ...state,
        top_types: action.payload
      };

    case GET_DAY_PRICE:
      return {
        ...state,
        day_price: action.payload
      };

    case GET_WEEK_ONLINE:
      return {
        ...state,
        week_online: action.payload
      };

    default:
      return state;
  }
}
