import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./header.css";
import Search from "../search/search";

class Header extends Component {
  state = {
    search_div: false,
    hat_active: false
  };
  onClick = () => {
    const { search_div } = this.state;
    this.setState({
      search_div: !search_div
    });
  };

  render() {
    const { search_div } = this.state;
    return (
      <div>
        <div className="header">
          <nav className="navbar navbar-expand-xl navbar-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="col-header-1">
              <ul className="navbar-nav ">
                <li className="border">
                  <Link to={`/`}> MAX_BELL.com</Link>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-header-9">
                    <ul className="navbar-nav ">
                      <li className="active">
                        <Link to={`/catalog/HAT`}>Шапки</Link>
                      </li>
                      <li>
                        <Link to={`/catalog/T-SHIRT`}>Футболки</Link>
                      </li>
                      <li>
                        <Link to={`/catalog/SWEATSHIRT`}>Свитшоты</Link>
                      </li>
                      <li>
                        <Link to={`/catalog/HOODIE`}>Худи</Link>
                      </li>
                      <li>
                        <Link to={`/catalog/BACKPACK`}>Рюкзаки</Link>
                      </li>
                      <li>
                        <Link to={`/catalog/CAP`}>Кепки</Link>
                      </li>
                      <li>
                        <Link to={`#`}>Вопрос ответ</Link>
                      </li>
                      <li>
                        <Link to={`/prevOrders`}>Мои заказы</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="col-header-1 search">
                <ul className="navbar">
                  <li className="border">
                    <Link
                      to={`#`}
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Search"
                      onClick={this.onClick}
                    >
                      <i className="fa fa-search" aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-header-1 cart">
                <ul className="navbar">
                  <li className="border">
                    <Link
                      to={`/order`}
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Order"
                    >
                      <i className="fas fa-shopping-cart " />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {search_div ? <Search /> : ""}
      </div>
    );
  }
}

export default Header;
