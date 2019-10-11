import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  pagination = (totalPages, currentPage) => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      if (i == currentPage) {
        pages.push(
          <li className="page-item" key={i}>
            <Link className="page-link active-page" to={"#"} onClick={null}>
              {i + 1}
            </Link>
          </li>
        );
      } else {
        pages.push(
          <li className="page-item" key={i}>
            <Link
              className="page-link"
              to={"#"}
              onClick={() => this.onPageClick(i)}
            >
              {i + 1}
            </Link>
          </li>
        );
      }
    }
    return pages;
  };

  elementsOnPage = currentSize => {
    const elementsOnPage = [1, 2, 3];
    let array = [];
    for (let i = 0; i < elementsOnPage.length; i++) {
      if (elementsOnPage[i] == currentSize) {
        array.push(
          <li className="page-item" key={i}>
            <Link className="page-link active-page" to={"#"} onClick={null}>
              {elementsOnPage[i]}
            </Link>
          </li>
        );
      } else {
        array.push(
          <li className="page-item" key={i}>
            <Link
              className="page-link"
              to={"#"}
              onClick={() => this.onPageElementsClick(elementsOnPage[i])}
            >
              {elementsOnPage[i]}
            </Link>
          </li>
        );
      }
    }
    return array;
  };

  onPageClick = pageNumber => {
    const { size } = this.props;
    this.props.getAction(pageNumber, size);
  };

  nextPage = pageNumber => {
    const { size, last } = this.props;
    if (!last) {
      this.props.getAction(pageNumber + 1, size);
    } else {
      this.props.getAction(0, size);
    }
  };

  onPageElementsClick = pageSize => {
    this.props.getAction(0, pageSize);
  };

  nextElement = (number, pageSize) => {
    if (pageSize >= 3) {
      this.props.getAction(number, 1);
    } else {
      this.props.getAction(0, pageSize + 1);
    }
  };

  render() {
    const { totalPages, number, size } = this.props;
    return (
      <div className="justify-content-center pagination-layout">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Страницы</span>
          </li>
          {this.pagination(totalPages, number)}
          <li className="page-item">
            <Link
              className="page-link"
              to={"#"}
              onClick={() => this.nextPage(number)}
            >
              Следующая
            </Link>
          </li>
        </ul>

        <ul className="pagination ml-2">
          <li className="page-item disabled">
            <span className="page-link">Элементов на странице</span>
          </li>
          {this.elementsOnPage(size)}
          <li className="page-item">
            <Link
              className="page-link"
              to={"#"}
              onClick={() => this.nextElement(number, size)}
            >
              Далее
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
