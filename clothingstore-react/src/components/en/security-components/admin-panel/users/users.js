import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getElements } from "../../../../../action/admin-actions";
import { getAllUsers } from "../getters/getters";
import Pagination from "../../../navbar-components/pagination/pagination";
import { Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Users_en extends Component {
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
        `customer/search/${search_text}`
      );
    } else {
      return this.props.getElements(pageNumber, size, `customer/all`);
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
      this.props.getElements(0, 10, "customer/all");
    } else {
      this.getAction(0, 10);
    }
  };

  onCsvExport = () => {
    const { content } = this.props.customers;
    let arr = [];
    content.map(({ id, photo, firstName, username, gender, authority }) => {
      return arr.push(
        id +
          ";" +
          photo +
          ";" +
          firstName +
          ";" +
          username +
          ";" +
          gender +
          ";" +
          authority.authority +
          ";\n"
      );
    });

    var myLink = document.createElement("a");
    myLink.download = "customers.csv";
    myLink.href = "data:application/csv," + escape(arr.join(" "));
    myLink.click();
  };

  render() {
    const { content, totalPages, number, size, last } = this.props.customers;

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="search-users">
          <span>Search users</span>
          <input
            className="form-control"
            placeholder="Начните вводить имя пользователя или его email"
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
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Authority</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{content && getAllUsers(content)}</tbody>
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

Users_en.propTypes = {
  customers: PropTypes.object.isRequired,
  getElements: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  customers: state.admin.elements
});
export default connect(
  mapStateToProps,
  { getElements }
)(Users_en);
