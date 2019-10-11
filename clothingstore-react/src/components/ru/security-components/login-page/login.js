import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login, OAuthlogin } from "../../../../action/security-actions";
import { getCookie } from "../../../../cookie-utils/language-cookie";

class Login extends Component {
  state = {
    customer: {
      username: "",
      password: ""
    },
    errors: {}
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/order");
    }
    const auth_token = getCookie("auth_token");
    if (auth_token != null) {
      this.props.OAuthlogin(this.props.history, auth_token);
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
              <div className="title">ВХОД ЧЕРЕЗ САЙТ</div>
              <form onSubmit={this.onLogin}>
                <InputRow
                  fieldName={"Email"}
                  type={"email"}
                  name={"username"}
                  placeholder={"Ваше email"}
                  onChange={this.onChange}
                  value={username}
                  errors={errors.username}
                  reg_link={false}
                />
                <InputRow
                  fieldName={"Пароль"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Ваше пароль"}
                  onChange={this.onChange}
                  value={password}
                  errors={errors.password}
                  reg_link={true}
                />
                <div className="login-buttons">
                  <button type="submit" className="btn btn-outline-success ">
                    Войти
                  </button>
                  <Link to={"/"} className="btn btn-outline-danger">
                    На главную
                  </Link>
                </div>
                <div className="or">
                  <span>ИЛИ</span>
                  <br />
                  <div>
                    <a href="https://maxbell.herokuapp.com/oauth2/authorize/google">
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                        alt="Image"
                      />
                      <span>Войти через Google</span>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  OAuthlogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login, OAuthlogin }
)(Login);

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
            Еще не зарегистрированы?
            <br />
            <Link to={"/registration"}>Зарегистрируйтесь!</Link>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export { InputRow };
