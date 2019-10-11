import React, { Component } from "react";
import "./order.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getOrder,
  deleteAllFromOrder,
  deleteItemFromOrder
} from "../../../../action/order-actions";
import { tableRow, getTotalPrice } from "./order-elements";
import { Link } from "react-router-dom";

class Order extends Component {
  componentDidMount() {
    this.props.getOrder();
  }

  onDeleteAllClick = () => {
    const { order } = this.props.order;
    this.props.deleteAllFromOrder(order, this.props.history);
  };

  onDeleteItemClick = id => {
    const { order } = this.props.order;
    this.props.deleteItemFromOrder(order, id, this.props.history);
  };

  render() {
    const { clothes, orderAdditionals } = this.props.order.order;
    const flag = true;
    return (
      <div>
        <div className="container order">
          <div className="row">
            <table className="order-table table">
              <thead>
                <tr>
                  <th scope="col">Продукт</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Цена с доставкой</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {clothes ? (
                  tableRow(
                    clothes,
                    this.onDeleteItemClick,
                    flag,
                    orderAdditionals
                  )
                ) : (
                  <tr />
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="button-group">
              <div className="left-link">
                <button onClick={this.onDeleteAllClick}>
                  Очистить корзину
                </button>
                <Link to={`/`}>Вернуться к покупкам</Link>
              </div>
              <div className="right-link ">
                <p>
                  Итог к оплате:{" "}
                  <b>{clothes && getTotalPrice(clothes, orderAdditionals)} ₽</b>
                </p>
                <Link to={"/orderDetails"}>Оформить заказ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  getOrder: PropTypes.func.isRequired,
  deleteAllFromOrder: PropTypes.func.isRequired,
  deleteItemFromOrder: PropTypes.func.isRequired
};
const mapStateTpProps = state => ({
  order: state.order
});
export default connect(
  mapStateTpProps,
  { getOrder, deleteAllFromOrder, deleteItemFromOrder }
)(Order);
