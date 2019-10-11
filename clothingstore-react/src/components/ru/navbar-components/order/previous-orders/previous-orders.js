import React, { Component } from "react";
import "./previous-orders.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomerOrders } from "../../../../../action/order-actions";
import { getPreviousOrders } from "../order-elements";

class PreviousOrders extends Component {
  componentDidMount() {
    this.props.getCustomerOrders();
  }

  render() {
    const { orders } = this.props.order;
    return (
      <div className="previous-porders">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11 add-title text-center">
              Ваши предыдущие заказы
            </div>
            {orders && getPreviousOrders(orders)}
          </div>
        </div>
      </div>
    );
  }
}
PreviousOrders.propTypes = {
  getCustomerOrders: PropTypes.func.isRequired
};

const mapStateTpProps = state => ({
  order: state.order
});

export default connect(
  mapStateTpProps,
  { getCustomerOrders }
)(PreviousOrders);
