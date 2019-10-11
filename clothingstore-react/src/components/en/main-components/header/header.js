import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search_en from "../search/search";

class Header_en extends Component {
  state = {
    search_div: false
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
                  <Link to={`/en/`}> MAX_BELL.com</Link>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-header-9">
                    <ul className="navbar-nav ">
                      <li className="active">
                        <Link to={`/en/catalog/HAT`}>HATS</Link>
                      </li>
                      <li>
                        <Link to={`/en/catalog/T-SHIRT`}>T-SHIRTS</Link>
                      </li>
                      <li>
                        <Link to={`/en/catalog/SWEATSHIRT`}>SWEATSHIRTS</Link>
                      </li>
                      <li>
                        <Link to={`/en/catalog/HOODIE`}>HOODIE</Link>
                      </li>
                      <li>
                        <Link to={`/en/catalog/BACKPACK`}>BACKPACKS</Link>
                      </li>
                      <li>
                        <Link to={`/en/catalog/CAP`}>CAPS</Link>
                      </li>
                      <li>
                        <Link to={`#`}>Q&A</Link>
                      </li>
                      <li>
                        <Link to={`/en/prevOrders`}>Мy orders</Link>
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
                      to={`/en/order`}
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Tooltip on left"
                    >
                      <i className="fas fa-shopping-cart " />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {search_div ? <Search_en /> : ""}
      </div>
    );
  }
}

export default Header_en;
