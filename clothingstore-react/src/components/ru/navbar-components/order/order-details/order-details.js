import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./order-details.css";
import { getTotalPrice, getSize, getCount } from "../order-elements";
import { saveOrderDetails } from "../../../../../action/order-actions";
import { getRuCountryList } from "../../../../../action/additional-actions";

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
    this.props.getRuCountryList();
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
        totalPrice: getTotalPrice(clothes, orderAdditionals),
        totalPriceUSD: Math.round(getTotalPrice(clothes, orderAdditionals) / 65)
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
              <div className="add-title">Оформление заказа</div>
              {selectItem(
                "Страна:",
                "country",
                "",
                errors,
                this.onChange,
                this.getAdditionalElements
              )}
              {inputItem(
                this.state,
                "Город:",
                "city",
                "Введите ваш город",
                errors.city,
                this.onChange
              )}
              {inputItem(
                this.state.orderDetails,
                "Ваше ФИО:",
                "fio",
                "Введите ваш ФИО",
                errors.fio,
                this.onChange
              )}
              {inputItem(
                this.state.orderDetails,
                "Адрес доставки:",
                "address",
                "Введите ваш адрес",
                errors.address,
                this.onChange
              )}
              {inputItem(
                this.state.orderDetails,
                "Почтовый индекс:",
                "postcode",
                "Ваш почтовый индекс",
                errors.postcode,
                this.onChange
              )}
              {inputItem(
                this.state.orderDetails,
                "Номер телефона:",
                "phoneNumber",
                "Номер телефона",
                errors.phoneNumber,
                this.onChange
              )}
              {inputItem(
                this.state.orderDetails,
                "Email:",
                "email",
                "Ваш email",
                errors.email,
                this.onChange
              )}
              {inputItem(
                this.state.orderDetails,
                "Пожелания к заказу:",
                "orderWishes",
                "Введите текст",
                errors.orderWishes,
                this.onChange
              )}
            </div>
            <div className="col-xl-2 order-info">
              <div className="add-title">Ваш заказ</div>
              {clothes && orderItemsLoop(clothes, orderAdditionals, country)}
              <div className="order-itog">
                Итог к оплате:{" "}
                <b id="total-price">
                  {clothes && getTotalPrice(clothes, orderAdditionals, country)}{" "}
                  ₽
                </b>
              </div>
              <div className="add-title">Оплата</div>
              <button type="submit" className="order-button">
                Оплатить заказ
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
  { saveOrderDetails, getRuCountryList }
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
            "is-invalid": errors.name
          })}
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={e => onChange(e)}
        >
          <option value="">--ВЫБЕРИТЕ СТРАНУ--</option>
          {getAdditionalElements()}
        </select>
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
    </div>
  );
};
export { selectItem };

const orderItemsLoop = (items, additionals, delivery_country) => {
  return items.map(item => {
    const { price, name } = item;
    const itemindex = items.indexOf(item);

    let delivery = 0;
    if (delivery_country === "РОССИЯ") {
      delivery = item.countryDelivery;
    } else {
      delivery = item.worldDelivery;
    }
    return (
      <div className="order-item" key={items.indexOf(item)}>
        <b>
          {price * getCount(itemindex, additionals, true)[itemindex]} ₽ +
          <i>
            {delivery * getCount(itemindex, additionals, true)[itemindex]} ₽
          </i>
        </b>
        <div>{name}</div>
        <div>Размер: {getSize(itemindex, additionals, true)}</div>
        <div>Кол-во: {getCount(itemindex, additionals, true)}</div>
      </div>
    );
  });
};
export { orderItemsLoop };
