import axios from "axios";
import {
  GET_REVIEWS,
  GET_ERRORS,
  ADD_REVIEW,
  DELETE_REVIEW,
  GET_REVIEWS_LIKES,
  ADD_REVIEW_LIKE,
  GET_REVIEWS_REPORTS,
  ADD_REVIEW_REPORT,
  EDIT_REVIEW
} from "./types";

export const getClothesReviews = (
  clothes_id,
  page,
  size,
  sort,
  direction
) => async dispatch => {
  const res = await axios.get(
    `/review/clothes/${clothes_id}?page=${page}&size=${size}&sort=${sort},${direction}`
  );
  dispatch({
    type: GET_REVIEWS,
    payload: res.data
  });
};

export const addClothesReviews = (
  review,
  user,
  onLoadingEnd,
  onLoadingError
) => async dispatch => {
  const url = "/review/add";
  const formData = new FormData();
  for (let i = 0; i < review.images.length; i++) {
    formData.append("file", review.images[i]);
  }
  formData.append(
    "review",
    new Blob(
      [
        JSON.stringify({
          title: review.title,
          text: review.text,
          stars: review.stars,
          userEmail: user.userEmail,
          userName: user.userName,
          userImage: user.userImage,
          clothesId: review.clothesId
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

  await axios
    .post(url, formData, config)
    .then(res => {
      onLoadingEnd();
      var timerId = setInterval(function() {
        dispatch({
          type: ADD_REVIEW,
          payload: res.data
        });
      }, 500);

      setTimeout(function() {
        clearInterval(timerId);
      }, 3000);
    })
    .catch(error => {
      onLoadingError();
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const editClothesReviews = (
  review,
  onLoadingEnd,
  onLoadingError
) => async dispatch => {
  const url = "/review/edit";
  const formData = new FormData();
  for (let i = 0; i < review.addedImages.length; i++) {
    formData.append("file", review.addedImages[i]);
  }
  formData.append(
    "review",
    new Blob(
      [
        JSON.stringify({
          id: review.editReviewId,
          title: review.editedTitle,
          text: review.editedTekst,
          reviewImages: review.editedImages
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

  await axios
    .put(url, formData, config)
    .then(res => {
      onLoadingEnd();
      var timerId = setInterval(function() {
        dispatch({
          type: EDIT_REVIEW,
          payload: res.data
        });
      }, 500);

      setTimeout(function() {
        clearInterval(timerId);
      }, 3000);
    })
    .catch(error => {
      onLoadingError();
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const deleteClothesReview = clothes_id => async dispatch => {
  await axios.delete(`/review/delete/${clothes_id}`);
  dispatch({
    type: DELETE_REVIEW,
    payload: clothes_id
  });
};

export const getReviewLikes = clothes_id => async dispatch => {
  const res = await axios.get(`/review/likes/${clothes_id}`);
  dispatch({
    type: GET_REVIEWS_LIKES,
    payload: res.data
  });
};

export const addReviewLike = (
  likeOrDislike,
  clothesId,
  reviewId,
  userName
) => async dispatch => {
  try {
    const res = await axios.post("/review/like/add", {
      like_dislike: likeOrDislike,
      clothesId: clothesId,
      userName: userName,
      reviewId: reviewId
    });
    dispatch({
      type: ADD_REVIEW_LIKE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getReviewReports = clothes_id => async dispatch => {
  const res = await axios.get(`/review/reports/${clothes_id}`);
  dispatch({
    type: GET_REVIEWS_REPORTS,
    payload: res.data
  });
};

export const addReviewReport = (
  clothesId,
  reviewId,
  userName
) => async dispatch => {
  try {
    const res = await axios.post("/review/report/add", {
      clothesId: clothesId,
      userName: userName,
      reviewId: reviewId
    });
    dispatch({
      type: ADD_REVIEW_REPORT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
