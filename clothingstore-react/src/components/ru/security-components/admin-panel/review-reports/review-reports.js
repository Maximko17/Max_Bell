import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getElements } from "../../../../../action/admin-actions";
import { getAllReviewsReports } from "../getters/getters";
import Pagination from "../../../navbar-components/pagination/pagination";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class ReviewReports extends Component {
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
      return this.props.getElements(pageNumber, size, `review/reports/all`);
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
      this.props.getElements(0, 10, "review/reports/all");
    } else {
      this.getAction(0, 10);
    }
  };
  render() {
    const { content, totalPages, number, size, last } = this.props.reports;
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="search-users">
          <span>Поиск отзывов</span>
          <input
            className="form-control"
            placeholder="Начните вводить email или id отзыва"
            onChange={this.onChange}
            value={this.state.search_text}
          />
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Фото</th>
              <th scope="col">Имя</th>
              <th scope="col">Никнейм</th>
              <th scope="col">Дата</th>
              <th scope="col">Кол-во репортов</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{content && getAllReviewsReports(content)}</tbody>
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

ReviewReports.propTypes = {
  reports: PropTypes.object.isRequired,
  getElements: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  reports: state.admin.elements
});
export default connect(
  mapStateToProps,
  { getElements }
)(ReviewReports);
