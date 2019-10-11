import React, { Component } from "react";
import "./search.css";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    input: "",
    sort: "id-desc"
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { input, sort } = this.state;
    return (
      <div className="container hiden-block">
        <div className="row justify-content-center">
          <div className="search-block d-flex">
            <div className="search-field">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Что вы хотите найти"
                  aria-describedby="button-addon2"
                  name="input"
                  onChange={this.onChange}
                  value={input}
                />
                <div className="input-group-append">
                  <Link
                    className="btn"
                    to={`/catalog/search/${input}/${sort}`}
                    id="button-addon2"
                  >
                    Искать <i className="fa fa-search" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="sort">
              <select
                className="form-control"
                value={sort}
                onChange={this.onChange}
                name="sort"
              >
                <option value="id-desc">--СОРТИРОВАТЬ ПО--</option>
                <option value="price-asc">ЦЕНЕ(сначала дешевые)</option>
                <option value="price-desc">ЦЕНЕ(сначала дорогие)</option>
                <option value="popularity-desc">ПОПУЛЯРНОСТИ</option>
                <option value="id-desc">НОВИЗНЕ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
