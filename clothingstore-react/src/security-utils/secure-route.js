import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCookie } from "../cookie-utils/language-cookie";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      security.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={getCookie("LANGUAGE") ? "/en/login" : "/login"} />
      )
    }
  />
);

SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security
});
export default connect(mapStateToProps)(SecuredRoute);
