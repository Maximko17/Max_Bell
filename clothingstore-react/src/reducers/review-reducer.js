import {
  GET_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  GET_REVIEWS_LIKES,
  ADD_REVIEW_LIKE,
  GET_REVIEWS_REPORTS,
  ADD_REVIEW_REPORT,
  EDIT_REVIEW
} from "../action/types";

const initialState = {
  reviews: {},
  reviews_likes: [],
  reviews_reports: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          content: action.payload
        }
      };

    case EDIT_REVIEW:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          content: state.reviews.content.map(review => {
            if (review.id === action.payload.id) {
              review = action.payload;
            }
            return review;
          })
        }
      };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          content: state.reviews.content.filter(
            review => review.id !== action.payload
          )
        }
      };

    case GET_REVIEWS_LIKES:
      return {
        ...state,
        reviews_likes: action.payload
      };

    case ADD_REVIEW_LIKE:
      return {
        ...state,
        reviews_likes: contains(state.reviews_likes, action.payload.reviewId)
          ? state.reviews_likes.map(review_like => {
              if (review_like.reviewId === action.payload.reviewId) {
                return {
                  ...review_like,
                  like_dislike: action.payload.like_dislike
                };
              } else {
                return { ...review_like };
              }
            })
          : [...state.reviews_likes, action.payload],
        reviews: {
          ...state.reviews,
          content: state.reviews.content.map(review => {
            if (review.id === action.payload.reviewId) {
              if (action.payload.like_dislike) {
                console.log(review.userEmail);
                return {
                  ...review,
                  totalLikes: review.totalLikes + 1,
                  totalDislikes:
                    review.totalDislikes === 0 ||
                    review.userEmail === action.payload.userName
                      ? review.totalDislikes
                      : review.totalDislikes - 1
                };
              } else {
                return {
                  ...review,
                  totalDislikes: review.totalDislikes + 1,
                  totalLikes:
                    review.totalLikes === 0 ||
                    review.userEmail === action.payload.userName
                      ? review.totalLikes
                      : review.totalLikes - 1
                };
              }
            } else {
              return review;
            }
          })
        }
      };

    case GET_REVIEWS_REPORTS:
      return {
        ...state,
        reviews_reports: action.payload
      };

    case ADD_REVIEW_REPORT:
      return {
        ...state,
        reviews_reports: action.payload
      };

    default:
      return state;
  }
}

function contains(arr, elem) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].reviewId === elem) {
      return true;
    }
  }
  return false;
}
