import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getElements } from "../../../../../action/admin-actions";
import { getAllClothes } from "../getters/getters";
import Pagination from "../../../navbar-components/pagination/pagination";
import { Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Clothes extends Component {
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
        `catalog/search/${search_text}`
      );
    } else {
      return this.props.getElements(pageNumber, size, `catalog/all`);
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

    if (e.target.value === "") {
      this.props.getElements(0, 10, "catalog/all");
    } else {
      this.getAction(0, 10);
    }
  };

  onCsvExport = () => {
    const { content } = this.props.clothes;
    let arr = [];
    content.map(({ id, name, type, images, producer, price }) => {
      return arr.push(
        id +
          ";" +
          name +
          ";" +
          images[0].image +
          ";" +
          price +
          ";" +
          type +
          ";" +
          producer +
          ";\n"
      );
    });

    var myLink = document.createElement("a");
    myLink.download = "clothes.csv";
    myLink.href = "data:application/csv," + escape(arr.join(" "));
    myLink.click();
  };

  render() {
    const { content, totalPages, number, size, last } = this.props.clothes;
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="search-users">
          <span>Поиск вещей</span>
          <input
            className="form-control"
            placeholder="Начните вводить название/тип/производителя одежды"
            onChange={this.onChange}
            value={this.state.search_text}
          />
        </div>
        <div className="text-right mb-1">
          <Button color="primary" onClick={this.onCsvExport}>
            Экспорт в CSV
          </Button>
        </div>
        <table className="table" id="exportTable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Фото</th>
              <th scope="col">Название</th>
              <th scope="col">Цена</th>
              <th scope="col">Тип</th>
              <th scope="col">Производитель</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{content && getAllClothes(content)}</tbody>
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

Clothes.propTypes = {
  clothes: PropTypes.object.isRequired,
  getElements: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  clothes: state.admin.elements
});
export default connect(
  mapStateToProps,
  { getElements }
)(Clothes);
