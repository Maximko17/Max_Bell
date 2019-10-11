import React from "react";
import MappleToolTip from "reactjs-mappletooltip";

export const getReviews = (
  reviews,
  security,
  deleteReview,
  addReviewLike,
  reviews_likes,
  addReviewReport,
  reviews_reports,
  state,
  loading,
  onEditMode,
  onCancelEditMode,
  onEditModeDeleteImages,
  onEditChanges,
  saveEditChanges,
  addReviewImages
) => {
  return reviews.map(
    ({
      id,
      title,
      text,
      stars,
      userName,
      userImage,
      userEmail,
      clothesId,
      date,
      reviewImages,
      totalLikes,
      totalDislikes
    }) => {
      if (state.editMode && state.editReviewId === id) {
        return (
          <div className="col-lg-12 one-review" key={id}>
            <div className="d-flex">
              <div className="left-side">
                <img
                  src={
                    "https://s3-us-west-1.amazonaws.com/clothes-store-basket/users/" +
                    userImage
                  }
                />
                <div>{userName}</div>
                <div className="stars">{getStars(stars)}</div>
                <div>{getDate(date)}</div>
                {security.user.username === userEmail ? (
                  <div className="my-review">Ваш отзыв</div>
                ) : null}
              </div>
              <form className="right-side" onSubmit={e => saveEditChanges(e)}>
                <div className="right-side-title">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="editedTitle"
                    placeholder="Название (Максимум 50 символов)"
                    onChange={onEditChanges}
                    value={state.editedTitle}
                  />
                </div>
                <div className="right-side-text">
                  <textarea
                    className="form-control form-control-lg"
                    name="editedTekst"
                    aria-label="With textarea"
                    placeholder="Текст. (Максимум 250 символов)"
                    onChange={onEditChanges}
                    value={state.editedTekst}
                  />
                  <div className="d-flex edit-images">
                    {getImages(
                      state.editedImages,
                      true,
                      onEditModeDeleteImages
                    )}
                    <div id="added-images" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={addReviewImages}
                    />
                  </div>
                </div>
                {loading ? (
                  <div>
                    <button
                      className="btn btn-info mb-mt-2"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Сохраняем...
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="submit"
                      className="add-review-button submit-review-button"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      className="cancel-edit-mode"
                      onClick={() => onCancelEditMode()}
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        );
      } else {
        return (
          <div className="col-lg-12 one-review" key={id}>
            <div className="d-flex">
              <div className="left-side">
                <img
                  src={
                    "https://s3-us-west-1.amazonaws.com/clothes-store-basket/users/" +
                    userImage
                  }
                />
                <div>{userName}</div>
                <div className="stars">{getStars(stars)}</div>
                <div>{getDate(date)}</div>
                {security.user.username === userEmail ? (
                  <div className="my-review">Ваш отзыв</div>
                ) : null}
              </div>
              <div className="right-side">
                <div className="right-side-title">
                  <h4>{title}</h4>
                </div>
                <div className="right-side-text">
                  {text}
                  <div className="d-flex">{getImages(reviewImages)}</div>
                </div>
                {getLikesButtons(
                  id,
                  clothesId,
                  security.user.username,
                  totalLikes,
                  totalDislikes,
                  addReviewLike,
                  reviews_likes
                )}
              </div>
              <div className="icons">
                {getAdditionalButtons(
                  id,
                  clothesId,
                  userEmail,
                  security,
                  onEditMode,
                  deleteReview,
                  addReviewReport,
                  reviews_reports
                )}
              </div>
            </div>
          </div>
        );
      }
    }
  );
};

const getLikesButtons = (
  reviewId,
  clothesId,
  userName,
  totalLikes,
  totalDislikes,
  addReviewLike,
  reviews_likes
) => {
  if (reviews_likes.length === 0) {
    return (
      <div className="review-likes ">
        Отзыв оказался полезным?
        <button
          className="like-review-button"
          onClick={() => addReviewLike(true, clothesId, reviewId, userName)}
        >
          <i className={"far fa-thumbs-up"} /> {totalLikes}
        </button>
        <button
          className="dislike-review-button"
          onClick={() => addReviewLike(false, clothesId, reviewId, userName)}
        >
          <i className={"far fa-thumbs-down"} /> {totalDislikes}
        </button>
      </div>
    );
  } else {
    let likes = [];
    let dislikes = [];
    for (var i = 0; i < reviews_likes.length; i++) {
      if (reviews_likes[i].reviewId === reviewId) {
        likes.push(
          <div className="review-likes ">
            Отзыв оказался полезным?
            <button
              className="like-review-button"
              onClick={() => addReviewLike(true, clothesId, reviewId, userName)}
            >
              <i
                className={
                  reviews_likes[i].like_dislike
                    ? "fas fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              />{" "}
              {totalLikes}
            </button>
            <button
              className="dislike-review-button"
              onClick={() =>
                addReviewLike(false, clothesId, reviewId, userName)
              }
            >
              <i
                className={
                  reviews_likes[i].like_dislike
                    ? "far fa-thumbs-down"
                    : "fas fa-thumbs-down"
                }
              />{" "}
              {totalDislikes}
            </button>
          </div>
        );
      } else {
        dislikes.push(
          <div className="review-likes ">
            Отзыв оказался полезным?
            <button
              className="like-review-button"
              onClick={() => addReviewLike(true, clothesId, reviewId, userName)}
            >
              <i className={"far fa-thumbs-up"} /> {totalLikes}
            </button>
            <button
              className="dislike-review-button"
              onClick={() =>
                addReviewLike(false, clothesId, reviewId, userName)
              }
            >
              <i className={"far fa-thumbs-down"} /> {totalDislikes}
            </button>
          </div>
        );
      }
    }
    if (likes.length !== 0) {
      return likes[0];
    } else if (dislikes.length !== 0) {
      return dislikes[0];
    }
  }
};

const getStars = starsCount => {
  let stararr = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= starsCount) {
      stararr.push(<i className="fas fa-star" key={i} />);
    } else {
      stararr.push(<i className="far fa-star" key={i} />);
    }
  }
  return stararr;
};

const getDate = datefromDb => {
  const mlist = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
  ];
  var date = new Date(datefromDb);
  var now = new Date();
  if (date.getDay() === now.getDay()) {
    return "Сегодня в " + date.getHours() + "." + date.getMinutes();
  } else if (date.getDay() === now.getDay() - 1) {
    return "Вчера в " + date.getHours() + "." + date.getMinutes();
  } else {
    return (
      date.getDate() +
      " " +
      mlist[date.getMonth()] +
      " в " +
      date.getHours() +
      "." +
      date.getMinutes()
    );
  }
};

const getImages = (images, editMode, onEditModeDeleteImages) => {
  let imageArr = [];
  for (let i = 0; i < images.length; i++) {
    imageArr.push(
      <div key={i}>
        <img
          src={`https://clothes-store-basket.s3-us-west-1.amazonaws.com/reviews/${images[i].image}`}
          alt="review-image"
          key={i}
        />
        <br />
        {editMode ? (
          <button
            type="button"
            className="btn btn-danger delete-img"
            onClick={() => onEditModeDeleteImages(i)}
          >
            <i className="fas fa-trash-alt" />
          </button>
        ) : null}
      </div>
    );
  }
  return imageArr;
};

const getAdditionalButtons = (
  id,
  clothesId,
  reviewUserEmail,
  security,
  onEditMode,
  deletefunction,
  addReviewReport,
  reviews_reports
) => {
  const mappleConfig = {
    direction: "right"
  };
  const btnArr = [
    <MappleToolTip {...mappleConfig} key={0}>
      <button className="edit-review-button" onClick={() => onEditMode(id)}>
        <i className="fas fa-pencil-alt" />
      </button>
      <div>Редактировать</div>
    </MappleToolTip>,
    <MappleToolTip {...mappleConfig} key={1}>
      <button
        className="delete-review-button"
        onClick={() => deletefunction(id)}
      >
        <i className="fas fa-trash-alt" />
      </button>
      <div>Удалить отзыв</div>
    </MappleToolTip>,
    <MappleToolTip {...mappleConfig} key={2}>
      <button
        className={
          contains(reviews_reports, id)
            ? "report-review-button text-danger"
            : "report-review-button"
        }
        onClick={() => addReviewReport(clothesId, id, security.user.username)}
      >
        <i className="fas fa-flag" />
      </button>
      <div>Сообщить о нарушении</div>
    </MappleToolTip>
  ];
  if (security.user.authority === "ROLE_ADMIN") {
    return btnArr;
  } else {
    if (security.user.username === reviewUserEmail) {
      return [btnArr[0], btnArr[1]];
    } else {
      return btnArr[2];
    }
  }
};

function contains(arr, elem) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].reviewId === elem) {
      return true;
    }
  }
  return false;
}
