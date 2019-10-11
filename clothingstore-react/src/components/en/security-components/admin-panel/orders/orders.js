import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getElements } from "../../../../../action/admin-actions";
import { getAllOrders } from "../getters/getters";
import Pagination from "../../../navbar-components/pagination/pagination";
import { Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Orders_en extends Component {
  state = {
    search_mode: false,
    search_text: ""
  };

  getAction = (pageNumber, size) => {
    const { search_mode, search_text } = this.state;
    if (search_mode) {
      return this.props.getElements(
        pageNumber,
        size,
        `order/search/${search_text}`
      );
    } else {
      return this.props.getElements(pageNumber, size, `order/all`);
    }
  };

  componentDidMount() {
    this.getAction(0, 10);
  }

  onChange = e => {
    this.setState({
      search_mode: true,
      search_text: e.target.value
    });

    if (e.target.value == "") {
      this.props.getElements(0, 10, "order/all");
    } else {
      this.getAction(0, 10);
    }
  };

  onCsvExport = () => {
    const { content } = this.props.orders;
    let arr = [];
    content.map(({ id, uniqueId, customer, orderDetails }) => {
      return arr.push(
        id + ";" + uniqueId + ";" + customer + ";" + orderDetails.status + ";\n"
      );
    });

    var myLink = document.createElement("a");
    myLink.download = "orders.csv";
    myLink.href = "data:application/csv," + escape(arr.join(" "));
    myLink.click();
  };

  render() {
    const { content, totalPages, number, size, last } = this.props.orders;
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="search-users">
          <span>Search for orders</span>
          <input
            className="form-control"
            placeholder="Start entering a unique order ID or customer email"
            onChange={this.onChange}
            value={this.state.search_text}
          />
        </div>
        <div className="text-right mb-1">
          <Button color="primary" onClick={this.onCsvExport}>
            Экспорт в CSV
          </Button>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Email</th>
              <th scope="col">Status</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{content && getAllOrders(content)}</tbody>
        </table>

        <Pagination
          totalPages={totalPages}
          number={number}
          size={size}
          last={last}
          getAction={this.getAction}
        />
      </ReactCSSTransitionGroup>
    );
  }
}

Orders_en.propTypes = {
  orders: PropTypes.object.isRequired,
  getElements: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  orders: state.admin.elements
});
export default connect(
  mapStateToProps,
  { getElements }
)(Orders_en);
