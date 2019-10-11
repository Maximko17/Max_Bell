import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTotalPrice, getSize, getCount } from "../order-elements";
import { saveOrderDetails } from "../../../../../action/order-actions";
import { getEnCountryList } from "../../../../../action/additional-actions";

class OrderDetails extends Component {
  state = {
    orderDetails: {
      address: "",
      city: "",
      country: "",
      email: "",
      fio: "",
      orderWishes: "",
      phoneNumber: "",
      postcode: "",
      totalPrice: "",
      totalPriceUSD: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getEnCountryList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    const { clothes, orderAdditionals } = this.props.order;

    this.setState({
      orderDetails: {
        ...this.state.orderDetails,
        [e.target.name]: e.target.value,
        totalPrice: getTotalPrice(clothes, orderAdditionals) * 65,
        totalPriceUSD: getTotalPrice(clothes, orderAdditionals)
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { orderDetails } = this.state;
    this.props.saveOrderDetails(orderDetails, this.props.history);
  };

  getAdditionalElements = () => {
    const { additional } = this.props;
    return (
      additional &&
      additional.map(country => {
        return <option key={additional.indexOf(country)}>{country}</option>;
      })
    );
  };

  render() {
    const { errors } = this.state;
    const { clothes, orderAdditionals } = this.props.order;
    const { country } = this.state.orderDetails;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="container-fluid mt-4">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="add-title">Order periodical</div>
              {selectItem(
                "Country:",
                "country",
                "",
                errors.country,
                this.onChange,
                this.getAdditionalElements
              )}
              {inputItem(
                this.state,
                "City:",
                "city",
                "Enter your city",
                errors.city,
                this.onChange
              )}
              {inputItem(
                this.state,
                "Your full name:",
                "fio",
                "Enter your full name",
                errors.fio,
                this.onChange
              )}
              {inputItem(
                this.state,
                "Delivery address:",
                "address",
                "Enter your delivery address",
                errors.address,
                this.onChange
              )}
              {inputItem(
                this.state,
                "Postcode:",
                "postcode",
                "Enter your postcode",
                errors.postcode,
                this.onChange
              )}
              {inputItem(
                this.state,
                "Phone number:",
                "phoneNumber",
                "Phone number",
                errors.phoneNumber,
                this.onChange
              )}
              {inputItem(
                this.state,
                "Email:",
                "email",
                "Your email",
                errors.email,
                this.onChange
              )}
              {inputItem(
                this.state,
                "Order wishes:",
                "orderWishes",
                "Enter your order wishes ",
                errors.orderWishes,
                this.onChange
              )}
            </div>
            <div className="col-xl-2 order-info">
              <div className="add-title">Your order</div>
              {clothes && orderItemsLoop(clothes, orderAdditionals, country)}
              <div className="order-itog">
                Total price:{" "}
                <b id="total-price">
                  {clothes && getTotalPrice(clothes, orderAdditionals, country)}{" "}
                  $
                </b>
              </div>
              <div className="add-title">Payment</div>
              <button type="submit" className="order-button">
                Pay order
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

OrderDetails.propTypes = {
  errors: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  additional: PropTypes.array.isRequired,
  saveOrderDetails: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  order: state.order.order,
  errors: state.errors,
  additional: state.additional.countries
});
export default connect(
  mapStateToProps,
  { saveOrderDetails, getEnCountryList }
)(OrderDetails);

const inputItem = (state, fieldName, name, placeholder, errors, onChange) => {
  return (
    <div className="details-row">
      <div>{fieldName}</div>
      <div>
        <input
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors
          })}
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={e => onChange(e)}
          value={state.name}
        />
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};
export { inputItem };

const selectItem = (
  fieldName,
  name,
  placeholder,
  errors,
  onChange,
  getAdditionalElements
) => {
  return (
    <div className="details-row">
      <div>{fieldName}</div>
      <div>
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors
          })}
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={e => onChange(e)}
        >
          <option value="">--CHOOSE COUNTRY--</option>
          {getAdditionalElements()}
        </select>
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};
export { selectItem };

const orderItemsLoop = (items, additionals, delivery_country) => {
  return items.map(item => {
    const { en_price, en_name } = item;
    const itemindex = items.indexOf(item);

    let delivery = 0;
    if (delivery_country === "RUSSIA") {
      delivery = item.en_countryDelivery;
    } else {
      delivery = item.en_worldDelivery;
    }
    return (
      <div className="order-item" key={items.indexOf(item)}>
        <b>
          {en_price * getCount(itemindex, additionals, true)[itemindex]} $ +
          <i>
            {delivery * getCount(itemindex, additionals, true)[itemindex]} $
          </i>
        </b>
        <div>{en_name}</div>
        <div>Size: {getSize(itemindex, additionals, true)}</div>
        <div>Count: {getCount(itemindex, additionals, true)}</div>
      </div>
    );
  });
};
export { orderItemsLoop };

const coutryloop = countries => {
  return countries.map(country => {
    const { en_name } = country;
    return <option key={countries.indexOf(country)}>{en_name}</option>;
  });
};
export { coutryloop };
