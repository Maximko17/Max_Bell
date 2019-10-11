import {
  GET_ITEMS,
  GET_ITEM,
  DELETE_ITEM,
  GET_IMAGES,
  DELETE_IMAGE,
  GET_LIKES,
  ADD_ONE_LIKE,
  DELETE_ONE_LIKE,
  ADD_IMAGES
} from "../action/types";

const initialState = {
  items: {},
  item: {},
  images: [],
  likes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        item: {},
        items: action.payload
      };

    case GET_ITEM:
      return {
        ...state,
        item: action.payload
      };

    case DELETE_ITEM:
      return {
        items: state.items.filter(item => item.id !== action.payload)
      };

    case ADD_IMAGES:
      return {
        ...state,
        images: action.payload
      };

    case GET_IMAGES:
      return {
        ...state,
        images: action.payload
      };

    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(image => image.id !== action.payload)
      };

    case GET_LIKES:
      return {
        ...state,
        likes: action.payload
      };

    case ADD_ONE_LIKE:
      return {
        ...state,
        items: {
          ...state.items,
          content: state.items.content.map(item =>
            item.id === action.payload
              ? { ...item, totalLikes: item.totalLikes + 1 }
              : item
          )
        }
      };

    case DELETE_ONE_LIKE:
      return {
        ...state,
        items: {
          ...state.items,
          content: state.items.content.map(item =>
            item.id === action.payload
              ? { ...item, totalLikes: item.totalLikes - 1 }
              : item
          )
        }
      };

    default:
      return state;
  }
}
