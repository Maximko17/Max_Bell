import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./registration.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createNewCustomer } from "../../../../action/security-actions";

class Registration extends Component {
  state = {
    customer: {
      firstName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "Man"
    },
    photo: "",
    display_foto: false,
    captcha_errors: false,
    errors: {}
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/order");
    }
    this.createCaptcha();
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

  onFileCHange = e => {
    const the_return = document.getElementById("file-return");
    the_return.innerHTML = e.target.value;

    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("userPoto").src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);

    this.setState({ photo: e.target.files[0], display_foto: true });
  };

  onRegister = e => {
    e.preventDefault();

    this.validateCaptcha();

    const { customer, photo } = this.state;
    const newCustomer = customer;
    this.props.createNewCustomer(
      newCustomer.firstName,
      newCustomer.username,
      newCustomer.password,
      newCustomer.confirmPassword,
      newCustomer.gender,
      photo,
      this.props.history
    );
  };

  _code = "";
  createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById("captcha").innerHTML = "";
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 180;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "40px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this._code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }

  validateCaptcha() {
    if (document.getElementById("cpatchaTextBox").value != this._code) {
      this.setState({ captcha_errors: true });
      this.createCaptcha();
    } else {
      this.setState({ captcha_errors: false });
    }
  }

  render() {
    const {
      firstName,
      username,
      password,
      confirmPassword
    } = this.state.customer;
    const { errors, display_foto, captcha_errors } = this.state;

    const style = {
      display: "none"
    };
    return (
      <div className="login-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 shadow">
              <div className="title">РЕГИСТРАЦИЯ</div>
              <form onSubmit={this.onRegister}>
                <InputRow
                  fieldName={"Ваше имя"}
                  type={"text"}
                  name={"firstName"}
                  placeholder={"Введите ваше имя"}
                  onChange={this.onChange}
                  value={firstName}
                  errors={errors.firstName}
                />
                <InputRow
                  fieldName={"Email"}
                  type={"email"}
                  name={"username"}
                  placeholder={"Ваше email"}
                  onChange={this.onChange}
                  value={username}
                  errors={errors.username}
                />
                <InputRow
                  fieldName={"Пароль"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Ваше пароль"}
                  onChange={this.onChange}
                  value={password}
                  errors={errors.password}
                />
                <InputRow
                  fieldName={"Подтверждения пароля"}
                  type={"password"}
                  name={"confirmPassword"}
                  placeholder={"Подтвердите пароль"}
                  onChange={this.onChange}
                  value={confirmPassword}
                  errors={errors.confirmPassword}
                />
                <div id="captcha" />
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": captcha_errors
                    })}
                    placeholder="Введите символы с картинки"
                    id="cpatchaTextBox"
                    aria-describedby="refresh-button"
                  />

                  <div className="input-group-append">
                    <button
                      type="button"
                      onClick={() => this.createCaptcha()}
                      id="refresh-button"
                    >
                      Обновить
                    </button>
                  </div>
                </div>

                <div className="gender text-center mt-3">
                  <p id="gender-title">Ваш пол</p>
                  <input
                    type="radio"
                    name="gender"
                    id="man"
                    value="Man"
                    checked={this.state.customer.gender == "Man"}
                    onChange={this.onChange}
                  />
                  <label htmlFor="man">Мужчина</label>
                  <input
                    type="radio"
                    name="gender"
                    id="woman"
                    value="Woman"
                    checked={this.state.customer.gender == "Woman"}
                    onChange={this.onChange}
                  />
                  <label htmlFor="woman">Женщина</label>
                </div>
                <div className="photo mt-3 mb-2">
                  <p id="photo-title">Ваше фото(по желанию)</p>
                  <div className="input-file-container">
                    <input
                      className="input-file"
                      id="my-file"
                      type="file"
                      onChange={this.onFileCHange}
                    />
                    <label
                      tabIndex="0"
                      htmlFor="my-file"
                      className="input-file-trigger"
                    >
                      Выберите фото...
                    </label>
                  </div>
                </div>
                <div className="display-foto">
                  <p className="file-return" id="file-return" />
                  <img
                    src=""
                    id="userPoto"
                    alt="User Photo"
                    style={display_foto ? null : style}
                  />
                </div>
                <div className="login-buttons">
                  <button type="submit" className="btn btn-outline-success ">
                    Регистрация
                  </button>
                  <Link to={"/login"} className="btn btn-outline-danger">
                    Назад
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  createNewCustomer: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewCustomer }
)(Registration);

class InputRow extends Component {
  render() {
    const {
      fieldName,
      type,
      name,
      placeholder,
      onChange,
      value,
      errors
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
      </div>
    );
  }
}
export { InputRow };
