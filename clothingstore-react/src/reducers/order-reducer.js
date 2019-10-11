import {
  GET_ORDER,
  DELETE_ALL_FROM_ORDER,
  DELETE_ITEM_FROM_ORDER,
  GET_ORDER_BY_UNIQUE_ID,
  GET_CUSTOMER_ORDERS
} from "../action/types";

const initialState = {
  orders: [],
  order: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload
      };

    case GET_CUSTOMER_ORDERS:
      return {
        ...state,
        orders: action.payload
      };

    case GET_ORDER_BY_UNIQUE_ID:
      return {
        ...state,
        order: action.payload
      };

    case DELETE_ALL_FROM_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          clothes: []
        }
      };

    case DELETE_ITEM_FROM_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          clothes: state.order.clothes.filter(
            cloth => cloth.id != action.payload
          )
        }
      };

    default:
      return state;
  }
}
