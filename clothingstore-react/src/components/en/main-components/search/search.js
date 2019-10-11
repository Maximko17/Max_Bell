import React, { Component } from "react";
import "./search.css";
import { Link } from "react-router-dom";

class Search_en extends Component {
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
          <form className="search-block d-flex">
            <div className="search-field">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What do you want to find"
                  aria-describedby="button-addon2"
                  name="input"
                  onChange={this.onChange}
                  value={input}
                />
                <div className="input-group-append">
                  <Link
                    className="btn"
                    to={`/en/catalog/search/${input}/${sort}`}
                    id="button-addon2"
                  >
                    Search <i className="fa fa-search" aria-hidden="true" />
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
                <option value="id-desc">--SORT BY--</option>
                <option value="price-asc">PRICE (cheap first)</option>
                <option value="price-desc">PRICE (dear first)</option>
                <option value="popularity-desc">POPULARITY</option>
                <option value="id-desc">NOVELTY</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Search_en;
