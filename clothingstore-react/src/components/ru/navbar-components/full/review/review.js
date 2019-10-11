import React, { Component } from "react";
import { handleFiles } from "../../add-update-item/add-item-image/drag-and-drop";
import "./review.css";
import Captcha from "../../captcha/captcha";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  addClothesReviews,
  getClothesReviews,
  deleteClothesReview,
  addReviewLike,
  getReviewLikes,
  addReviewReport,
  getReviewReports,
  editClothesReviews
} from "../../../../../action/review-actions";
import { getReviews } from "./helper-functions";
import Pagination from "../../../navbar-components/pagination/pagination";
import Rating from "react-rating";

class AddReview extends Component {
  state = {
    review: {
      title: "",
      text: "",
      stars: 1,
      clothesId: "",
      totalLikes: 0,
      totalDislikes: 0,
      images: []
    },
    user: {
      userEmail: this.props.user.username,
      userName: this.props.user.firstName,
      userImage: this.props.user.photo
    },
    errors: {},
    loadingData: false,
    validCapctha: "",
    currentCaptcha: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }
  }
  addReviewImages = e => {
    handleFiles(e.target.files, "gallery");
    this.setState({
      review: { ...this.state.review, images: e.target.files }
    });
  };

  onReviewChange = e => {
    this.setState({
      review: { ...this.state.review, [e.target.name]: e.target.value }
    });
  };

  onRatingChange = value => {
    this.setState({
      review: { ...this.state.review, stars: value }
    });
  };

  onLoadingStart = () => {
    this.setState({
      loadingData: true
    });
  };

  onLoadingEnd = () => {
    this.setState({
      review: {
        title: "",
        text: "",
        stars: 1,
        clothesId: this.props.clothes_id,
        totalLikes: 0,
        totalDislikes: 0,
        images: []
      },
      loadingData: false,
      validCapctha: "",
      currentCaptcha: ""
    });
    this.props.showFormFunc();
  };

  onLoadingError = () => {
    this.setState({
      loadingData: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      review: {
        ...this.state.review,
        clothesId: this.props.clothes_id
      }
    });
    const { review, user, validCapctha, currentCaptcha } = this.state;
    this.onLoadingStart();
    if (validCapctha === currentCaptcha) {
      this.props.addClothesReviews(
        review,
        user,
        this.onLoadingEnd,
        this.onLoadingError
      );
    } else {
      this.onLoadingError();
      alert("Капча не совпадает");
    }
  };

  setValidCaptcha = captcha => {
    this.setState({
      validCapctha: captcha
    });
  };
  setCurrentCaptcha = e => {
    this.setState({
      currentCaptcha: e.target.value
    });
  };

  render() {
    const { title, text, errors, loadingData, currentCaptcha } = this.state;
    const { showForm } = this.props;
    return showForm ? (
      <div className="row justify-content-center">
        <div className="col-lg-4 review-rules" />
        <form className="col-lg-7 review-form" onSubmit={this.onSubmit}>
          <div className="add-review-title">
            <input
              type="text"
              name="title"
              className={classnames("form-control form-control-lg", {
                "is-ivalid": errors.title
              })}
              placeholder="Название (Максимум 50 символов)"
              onChange={this.onReviewChange}
              value={title}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
            <span>Введите заголовок к вашему отзыву.</span>
          </div>
          <div className="add-review-text">
            <textarea
              name="text"
              className={classnames("form-control form-control-lg", {
                "is-ivalid": errors.text
              })}
              aria-label="With textarea"
              placeholder="Текст. (Максимум 250 символов)"
              onChange={this.onReviewChange}
              value={text}
            />
            {errors.text && (
              <div className="invalid-feedback">{errors.text}</div>
            )}
            <span>Напишите ваше мнение о данном товаре.</span>
          </div>
          <div className="rating">
            <Rating
              initialRating={this.state.review.stars}
              emptySymbol="far fa-star fa-5x"
              fullSymbol="fas fa-star fa-5x"
              onChange={this.onRatingChange}
            />
            <br />
            <div>Насколько вы бы оценили этот товар?</div>
          </div>
          <div className="add-review-images">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={this.addReviewImages}
            />{" "}
            <br />
            <span>
              Вы также можете загрузить свое фото с данным товаром.(По желанию)
            </span>
          </div>
          <div id="gallery" />
          <Captcha
            currentCaptcha={currentCaptcha}
            set_valid_capctha={this.setValidCaptcha}
            set_current_captcha={this.setCurrentCaptcha}
          />
          <span>Это нужно для защиты от спама</span>
          <br />

          {loadingData ? (
            <button className="btn btn-info mb-mt-2" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Сохраняем...
            </button>
          ) : (
            <button
              type="submit"
              onSubmit={this.onSubmit}
              className="add-review-button submit-review-button"
            >
              Добавить
            </button>
          )}
        </form>
      </div>
    ) : (
      ""
    );
  }
}
AddReview.propTypes = {
  addClothesReviews: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.security.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addClothesReviews }
)(AddReview);

class ShowReview extends Component {
  state = {
    review: {
      editMode: false,
      editReviewId: "",
      editedTitle: "",
      editedTekst: "",
      editedImages: [],
      addedImages: []
    },
    currentSort: "date",
    currentDirection: "desc",
    loading: false
  };

  componentDidMount() {
    const { currentSort, currentDirection } = this.state;
    const { security, clothes_id } = this.props;

    this.props.getClothesReviews(
      clothes_id,
      0,
      5,
      currentSort,
      currentDirection
    );
    if (security.validToken) {
      this.props.getReviewLikes(clothes_id);
      this.props.getReviewReports(clothes_id);
    }
  }

  onEditMode = editReviewId => {
    const { content } = this.props.reviews;
    const editReview = content.filter(review => {
      return review.id === editReviewId;
    });
    this.setState({
      review: {
        editMode: true,
        editReviewId: editReviewId,
        editedTitle: editReview[0].title,
        editedTekst: editReview[0].text,
        editedImages: editReview[0].reviewImages,
        addedImages: []
      }
    });
  };

  onCancelEditMode = () => {
    this.setState({
      review: {
        editMode: false,
        editReviewId: "",
        editedTitle: "",
        editedTekst: "",
        editedImages: [],
        addedImages: []
      },
      loading: false
    });
  };

  onEditModeDeleteImages = imageIndex => {
    const { review } = this.state;
    this.setState({
      review: {
        ...review,
        editedImages: review.editedImages.filter(image => {
          return review.editedImages.indexOf(image) !== imageIndex;
        })
      }
    });
  };

  addReviewImages = e => {
    handleFiles(e.target.files, "added-images");
    this.setState({
      review: { ...this.state.review, addedImages: e.target.files }
    });
  };

  onEditChanges = e => {
    this.setState({
      review: { ...this.state.review, [e.target.name]: e.target.value }
    });
  };

  onLoadingStart = () => {
    this.setState({
      loading: true
    });
  };

  onLoadingError = () => {
    this.setState({
      loading: false
    });
  };

  saveEditChanges = e => {
    e.preventDefault();
    this.onLoadingStart();
    const review = this.state.review;
    this.props.editClothesReviews(
      review,
      this.onCancelEditMode,
      this.onLoadingError
    );
  };

  onSortChange = (sort, direction) => {
    this.setState(
      {
        currentSort: sort,
        currentDirection: direction
      },
      () => this.getAction(0, 5)
    );
  };

  getAction = (pageNumber, size) => {
    const { clothes_id } = this.props;
    const { currentSort, currentDirection } = this.state;
    return this.props.getClothesReviews(
      clothes_id,
      pageNumber,
      size,
      currentSort,
      currentDirection
    );
  };

  render() {
    const { content, totalPages, number, size, last } = this.props.reviews;
    const {
      security,
      reviews_likes,
      addReviewLike,
      deleteClothesReview,
      addReviewReport,
      reviews_reports
    } = this.props;
    const { currentSort, currentDirection } = this.state;
    return (
      <div>
        {content && content.length === 0 ? (
          <div className="length-null-mess">
            Будьте первым, кто добавит отзыв!
          </div>
        ) : null}
        {content && content.length <= 1 ? null : (
          <div>
            <u>Сортировать по:</u>
            <button
              className={
                currentSort === "date" && currentDirection === "asc"
                  ? "btn btn-link sort-active ml-1"
                  : "btn btn-link ml-1"
              }
              onClick={() => this.onSortChange("date", "asc")}
            >
              По дате (сначала старые)
            </button>
            <button
              className={
                currentSort === "date" && currentDirection === "desc"
                  ? "btn btn-link sort-active ml-1"
                  : "btn btn-link ml-1"
              }
              onClick={() => this.onSortChange("date", "desc")}
            >
              По дате (сначала новые)
            </button>
            <button
              className={
                currentSort === "totalLikes" && currentDirection === "desc"
                  ? "btn btn-link sort-active ml-1"
                  : "btn btn-link ml-1"
              }
              onClick={() => this.onSortChange("totalLikes", "desc")}
            >
              По лайкам
            </button>
            <button
              className={
                currentSort === "totalDislikes" && currentDirection === "desc"
                  ? "btn btn-link sort-active ml-1"
                  : "btn btn-link ml-1"
              }
              onClick={() => this.onSortChange("totalDislikes", "desc")}
            >
              По дизлайкам
            </button>
          </div>
        )}

        {content &&
          getReviews(
            content,
            security,
            deleteClothesReview,
            addReviewLike,
            reviews_likes,
            addReviewReport,
            reviews_reports,
            this.state.review,
            this.state.loading,
            this.onEditMode,
            this.onCancelEditMode,
            this.onEditModeDeleteImages,
            this.onEditChanges,
            this.saveEditChanges,
            this.addReviewImages
          )}
        {content && content.length <= 1 ? null : (
          <Pagination
            totalPages={totalPages}
            number={number}
            size={size}
            last={last}
            getAction={this.getAction}
          />
        )}
      </div>
    );
  }
}
ShowReview.propTypes = {
  getClothesReviews: PropTypes.func.isRequired,
  deleteClothesReview: PropTypes.func.isRequired,
  addReviewLike: PropTypes.func.isRequired,
  getReviewLikes: PropTypes.func.isRequired,
  addReviewReport: PropTypes.func.isRequired,
  getReviewReports: PropTypes.func.isRequired,
  editClothesReviews: PropTypes.func.isRequired
};
const mapStToPr = state => ({
  reviews: state.review.reviews,
  reviews_likes: state.review.reviews_likes,
  reviews_reports: state.review.reviews_reports,
  security: state.security
});
export const ConnectedShowReview = connect(
  mapStToPr,
  {
    getClothesReviews,
    deleteClothesReview,
    addReviewLike,
    getReviewLikes,
    addReviewReport,
    getReviewReports,
    editClothesReviews
  }
)(ShowReview);
