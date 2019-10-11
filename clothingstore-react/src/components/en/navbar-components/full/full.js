import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getItem } from "../../../../action/item-list-actions";
import { addInOrder } from "../../../../action/order-actions";
import AddReview, { ConnectedShowReview } from "./review/review";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Full_en extends Component {
  state = {
    fullItem: {
      clothes: {},
      orderAdditionals: {
        count: 1,
        size: "XS"
      }
    },
    size_remaining: 0,
    current_image: 0,
    showAddReviewForm: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getItem(id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.item) {
      return {
        fullItem: { ...prevState.fullItem, clothes: nextProps.item },
        size_remaining:
          nextProps.item.sizes === undefined
            ? null
            : nextProps.item.sizes[0].remaining
      };
    }
    return null;
  }

  onSubmitClick = () => {
    const { validToken } = this.props.security;
    if (validToken) {
      this.props.addInOrder(this.state.fullItem, this.props.history);
    } else {
      this.props.history.push("/en/login");
    }
  };

  onChange(e, remaining) {
    this.setState({
      fullItem: {
        ...this.state.fullItem,
        orderAdditionals: {
          ...this.state.fullItem.orderAdditionals,
          size: e.target.value
        }
      },
      size_remaining: remaining
    });
  }

  countMinusClick = () => {
    let { count } = this.state.fullItem.orderAdditionals;

    if (!(count <= 1)) {
      count--;
    } else {
      count -= 0;
    }
    this.setState({
      fullItem: {
        ...this.state.fullItem,
        orderAdditionals: {
          ...this.state.fullItem.orderAdditionals,
          count
        }
      }
    });
  };

  countPlusClick = () => {
    let { count } = this.state.fullItem.orderAdditionals;
    const { size_remaining } = this.state;

    if (size_remaining > 10) {
      if (!(count >= 10)) {
        count++;
      } else {
        count += 0;
      }
    } else {
      if (!(count >= size_remaining)) {
        count++;
      } else {
        count += 0;
      }
    }
    this.setState({
      fullItem: {
        ...this.state.fullItem,
        orderAdditionals: {
          ...this.state.fullItem.orderAdditionals,
          count
        }
      }
    });
  };

  getSizes = sizes => {
    return sizes.map(({ id, sizeName, remaining }) => {
      return (
        <div className="full-sizes" key={id}>
          <input
            type="radio"
            name="options"
            id={`option${id}`}
            value={sizeName}
            checked={this.state.fullItem.orderAdditionals.size === sizeName}
            onChange={e => this.onChange(e, remaining)}
          />
          <label key={id} htmlFor={`option${id}`}>
            {" "}
            {sizeName}{" "}
          </label>
        </div>
      );
    });
  };

  getRemainingMessage = remaining => {
    if (remaining === 0) {
      return <div className="full-remaining grey">Sold out</div>;
    } else if (remaining <= 25) {
      return <div className="full-remaining yellow">Ends</div>;
    } else {
      return <div className="full-remaining green">Are available</div>;
    }
  };

  getAllImages = images => {
    return (
      images &&
      images.map(image => {
        return (
          <div className="small-image" key={images.indexOf(image)}>
            <img
              src={
                "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
                image.image
              }
              onClick={() => this.onImageClick(images.indexOf(image))}
            />
          </div>
        );
      })
    );
  };

  onImageClick = image => {
    return this.setState({
      current_image: image
    });
  };

  onSliderClick = nextClick => {
    const length = this.props.item.images.length;
    const { current_image } = this.state;

    if (nextClick) {
      if (current_image < length - 1) {
        this.setState({
          current_image: current_image + 1
        });
      } else {
        this.setState({
          current_image: 0
        });
      }
    } else {
      if (current_image != 0) {
        this.setState({
          current_image: current_image - 1
        });
      } else {
        this.setState({
          current_image: length - 1
        });
      }
    }
  };

  showAddReviewForm = () => {
    return this.setState({
      showAddReviewForm: !this.state.showAddReviewForm
    });
  };

  render() {
    const {
      id,
      en_name,
      en_price,
      en_message,
      en_consist,
      sizes,
      en_worldDelivery,
      en_countryDelivery,
      images
    } = this.props.item;
    const { count } = this.state.fullItem.orderAdditionals;
    const { size_remaining, current_image, showAddReviewForm } = this.state;

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="container full">
          <div className="row justify-content-center">
            <div className="full-image col-lg-6">
              <img
                src={
                  images &&
                  "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
                    images[current_image].image
                }
                alt="Picture"
              />
              <div
                className="slider-prev"
                onClick={() => this.onSliderClick(false)}
              >
                <i className="fa fa-angle-left fa-2x" aria-hidden="true" />
              </div>
              <div
                className="slider-next"
                onClick={() => this.onSliderClick(true)}
              >
                <i className="fa fa-angle-right fa-2x" aria-hidden="true" />
              </div>

              <div className="small-images">{this.getAllImages(images)}</div>
            </div>
            <div className="full-content col-lg ml-3">
              <div className="full-name">{en_name}</div>
              <div className="full-price">{en_price} $</div>
              <p>
                (
                {`Delivery: around the world - ${en_worldDelivery} $, across Russia - ${en_countryDelivery} $`}
                )
              </p>
              <div className="full-mess">
                DESCRIPTION
                <p>{en_message}</p>
                CONSIST:
                <p>{en_consist}</p>
              </div>
              <div className="full-size">
                <b>Sizes</b>
                <br />
                <div className="d-flex">{sizes && this.getSizes(sizes)}</div>
                {this.getRemainingMessage(size_remaining)}
              </div>
              <div className="full-count">
                <b>Count</b>
                <div className="counter d-flex">
                  <Link to={"#"} onClick={this.countMinusClick}>
                    -
                  </Link>
                  <div className="bg-light">{count}</div>
                  <Link to={"#"} onClick={this.countPlusClick}>
                    +
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={size_remaining === 0 ? null : this.onSubmitClick}
                  className={
                    size_remaining == 0
                      ? "full-button not-allowed"
                      : "full-button"
                  }
                >
                  <i className="fas fa-shopping-cart "> Add in cart</i>
                </button>
              </div>
            </div>
          </div>
          <div className="reviews">
            <div className="add-title">
              <div className="d-flex justify-content-between">
                <div style={{ lineHeight: "4", height: "20px" }}>Reviews</div>
                <button
                  className="add-review-button"
                  onClick={this.showAddReviewForm}
                >
                  <i className="fa fa-plus" aria-hidden="true" />
                  Add review
                </button>
              </div>
            </div>
            <AddReview
              clothes_id={id}
              showForm={showAddReviewForm}
              showFormFunc={this.showAddReviewForm}
            />
            {id === undefined ? null : (
              <ConnectedShowReview clothes_id={id} key={id} />
            )}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Full_en.propTypes = {
  getItem: PropTypes.func.isRequired,
  addInOrder: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  item: state.item.item,
  security: state.security
});
export default connect(
  mapStateToProps,
  { getItem, addInOrder }
)(Full_en);
