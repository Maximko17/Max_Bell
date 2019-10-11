import { GET_PRODUCERS, GET_TYPES, GET_COUNTRIES } from "../action/types";

const initialState = {
  producers: [],
  types: [],
  countries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCERS:
      return {
        ...state,
        producers: action.payload
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      };

    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };

    default:
      return state;
  }
}
