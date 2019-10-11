import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login-header.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../../action/security-actions";
import {
  setCookie,
  getCookie,
  deleteCookie
} from "../../../../cookie-utils/language-cookie";

class LoginHeader extends Component {
  onClick = () => {
    this.props.logout();
    window.location.reload();
  };

  setEnLanguageCookie = () => {
    if (getCookie("LANGUAGE")) {
      deleteCookie("LANGUAGE");
      return setCookie("LANGUAGE", "EN", 3600000);
    } else {
      return setCookie("LANGUAGE", "EN", 3600000);
    }
  };

  getUserImage(user) {
    if (user.isOauthUser) {
      return <img src={user.photo} />;
    } else {
      return (
        <img
          src={`https://s3-us-west-1.amazonaws.com/clothes-store-basket/users/${
            user.photo
          }`}
        />
      );
    }
  }

  render() {
    const { validToken, user } = this.props.security;

    const authenticated = (
      <div>
        {user.authority == "ROLE_ADMIN" ? (
          <Link to={"/admin-panel"} className="dropdown-item">
            Панель администратора
          </Link>
        ) : null}
        <Link to={"/edit"} className="dropdown-item">
          Редактировать профиль
        </Link>
        <Link to={"/login"} onClick={this.onClick} className="dropdown-item">
          Выйти
        </Link>
      </div>
    );

    const notAuthenticated = (
      <div>
        <Link to={"/login"} className="dropdown-item">
          Войти
        </Link>
      </div>
    );

    return (
      <div className="login-header">
        <div className="container-fluid ">
          <div className="row justify-content-center">
            <div className="col-6 text-right">
              <Link to={"#"}>
                <img
                  src="http://abali.ru/wp-content/uploads/2010/12/russia-flag.png"
                  alt="language"
                />
              </Link>
              <Link to={"/en/"} onClick={this.setEnLanguageCookie}>
                <img
                  src="http://abali.ru/wp-content/uploads/2010/12/united-kingdom-flag.png"
                  alt="language"
                />
              </Link>
            </div>

            <div className="col-6">
              <div
                className="dropdown"
                style={validToken ? null : { margin: "5px" }}
              >
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" />
                  {validToken && this.getUserImage(user)}
                  {user.firstName}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {validToken ? authenticated : notAuthenticated}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginHeader.porpTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security
});
export default connect(
  mapStateToProps,
  { logout }
)(LoginHeader);
