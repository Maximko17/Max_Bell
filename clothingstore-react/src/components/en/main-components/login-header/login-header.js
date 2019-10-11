import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../../action/security-actions";
import { deleteCookie } from "../../../../cookie-utils/language-cookie";

class LoginHeader_en extends Component {
  onClick = () => {
    this.props.logout();
    window.location.reload();
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
          <Link to={"/en/admin-panel"} className="dropdown-item">
            Admin panel
          </Link>
        ) : null}
        <Link to={"/en/edit"} className="dropdown-item">
          Edit profile
        </Link>
        <Link to={"/en/login"} onClick={this.onClick} className="dropdown-item">
          Logout
        </Link>
      </div>
    );

    const notAuthenticated = (
      <div>
        <Link to={"/en/login"} className="dropdown-item">
          Log in
        </Link>
      </div>
    );

    const style = {
      margin: "5px"
    };
    return (
      <div className="login-header">
        <div className="container-fluid ">
          <div className="row justify-content-center">
            <div className="col-6 text-right">
              <Link to={"/"} onClick={() => deleteCookie("LANGUAGE")}>
                <img
                  src="http://abali.ru/wp-content/uploads/2010/12/russia-flag.png"
                  alt="language"
                />
              </Link>
              <Link to={"#"}>
                <img
                  src="http://abali.ru/wp-content/uploads/2010/12/united-kingdom-flag.png"
                  alt="language"
                />
              </Link>
            </div>

            <div className="col-6">
              <div className="dropdown" style={validToken ? null : style}>
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user">
                    {validToken && this.getUserImage(user)}
                    {user.firstName}
                  </i>
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

LoginHeader_en.porpTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security
});
export default connect(
  mapStateToProps,
  { logout }
)(LoginHeader_en);
