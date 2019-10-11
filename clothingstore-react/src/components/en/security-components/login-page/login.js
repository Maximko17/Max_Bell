import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../../../action/security-actions";

class Login_en extends Component {
  state = {
    customer: {
      username: "",
      password: ""
    },
    errors: {}
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/en/order");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      customer: { ...this.state.customer, [e.target.name]: e.target.value }
    });
  };

  onLogin = e => {
    e.preventDefault();
    const { customer } = this.state;

    const loginRequest = {
      username: customer.username,
      password: customer.password
    };
    this.props.login(loginRequest, this.props.history);
  };

  render() {
    const { username, password } = this.state.customer;
    const { errors } = this.state;
    return (
      <div className="login-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 shadow">
              <div className="title">LOG IN THROUGH SITE</div>
              <form onSubmit={this.onLogin}>
                <InputRow
                  fieldName={"Email"}
                  type={"email"}
                  name={"username"}
                  placeholder={"Your email"}
                  onChange={this.onChange}
                  value={username}
                  errors={errors.username}
                  reg_link={false}
                />
                <InputRow
                  fieldName={"Password"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Your password"}
                  onChange={this.onChange}
                  value={password}
                  errors={errors.password}
                  reg_link={true}
                />
                <div className="login-buttons">
                  <button type="submit" className="btn btn-outline-success ">
                    Log in
                  </button>
                  <Link to={"/en/"} className="btn btn-outline-danger">
                    To main
                  </Link>
                </div>
                <div className="or">
                  <span>OR</span>
                  <br />
                  <div>
                    <a href="http://localhost:8080/oauth2/authorize/google">
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                        alt="Image"
                      />
                      <span>Sign in with Google</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login_en.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login_en);

class InputRow extends Component {
  render() {
    const {
      fieldName,
      type,
      name,
      placeholder,
      onChange,
      value,
      errors,
      reg_link
    } = this.props;
    return (
      <div className="input">
        <span>{fieldName}</span>
        <input
          type={type}
          placeholder={placeholder}
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors
          })}
          name={name}
          value={value}
          onChange={e => onChange(e)}
        />
        {errors && <div className="invalid-feedback">{errors}</div>}

        {reg_link ? (
          <div className="register-link">
            Not registered yet?
            <br />
            <Link to={"/en/registration"}>Sign up!</Link>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export { InputRow };
