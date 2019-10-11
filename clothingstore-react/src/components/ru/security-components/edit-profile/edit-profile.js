import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./edit-profile.css";
import { updateCustomer } from "../../../../action/security-actions";

class EditProfile extends Component {
  state = {
    customer: {},
    passwordForm: false,
    photo: "",
    errors: {}
  };
  componentDidMount() {
    const { user } = this.props;
    this.setState({
      customer: {
        id: user.id,
        firstName: user.firstName,
        username: user.username,
        prevUsername: user.username,
        gender: user.gender,
        photo: user.photo,
        prevPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      photo: user.photo
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({
      customer: { ...this.state.customer, [e.target.name]: e.target.value }
    });
  };

  onFileChange = e => {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById("editPoto").src = e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      customer: { ...this.state.customer, photo: e.target.value },
      photo: e.target.files[0]
    });
  };

  onClick = () => {
    const { passwordForm } = this.state;
    this.setState({
      passwordForm: !passwordForm
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { customer, photo } = this.state;
    const updatedCustomer = customer;
    this.props.updateCustomer(updatedCustomer, photo, this.props.history);
  };

  render() {
    const {
      firstName,
      username,
      prevPassword,
      newPassword,
      confirmPassword
    } = this.state.customer;
    const { photo, errors, passwordForm } = this.state;

    const lw_style = {
      lineHeight: 1.2
    };
    return (
      <form onSubmit={this.onSubmit}>
        <div className="container mt-4" id="edit-container">
          <div className="row justify-content-center">
            <div className="add-title col-lg-12">Редактирование профиля</div>

            <div className="col-lg-8">
              {InputRow(
                "Ваше имя",
                "firstName",
                "text",
                "Введите ваше имя",
                this.onChange,
                firstName,
                errors.firstName
              )}
              {InputRow(
                "Ваше email",
                "username",
                "text",
                "Введите ваше email",
                this.onChange,
                username,
                errors.username
              )}
              <div className="add-row">
                <div>Ваш пол</div>
                <div className="gender">
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
              </div>
              <div className="add-row">
                <div style={lw_style}>
                  Ваше фото
                  <br />
                  (по желанию)
                </div>
                <div>
                  <input type="file" onChange={this.onFileChange} />
                </div>
              </div>

              <Link to={"#"} onClick={this.onClick} id="edit-password-link">
                Сменить пароль
              </Link>
              {passwordForm &&
                InputRow(
                  "Ваш старый пароль",
                  "prevPassword",
                  "password",
                  "Введите ваш прошлый пароль",
                  this.onChange,
                  prevPassword,
                  errors.prevPassword
                )}
              {passwordForm &&
                InputRow(
                  "Ваше новый пароль",
                  "newPassword",
                  "password",
                  "Введите ваш новый пароль",
                  this.onChange,
                  newPassword,
                  errors.newPassword
                )}
              {passwordForm &&
                InputRow(
                  "Подтвердите пароль",
                  "confirmPassword",
                  "password",
                  "Подтвердите пароль",
                  this.onChange,
                  confirmPassword,
                  errors.confirmPassword
                )}
            </div>
            <div className="col-lg-4 text-center">
              <img
                src={`https://s3-us-west-1.amazonaws.com/clothes-store-basket/users/${photo}`}
                id="editPoto"
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="save-button">
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );
  }
}
EditProfile.propTypes = {
  updateCustomer: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.security.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateCustomer }
)(EditProfile);

const InputRow = (
  fieldName,
  name,
  type,
  placeholder,
  onChange,
  value,
  errors
) => {
  return (
    <div className="add-row">
      <div>{fieldName}:</div>
      <div>
        <input
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors
          })}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={e => onChange(e)}
          value={value}
        />
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};
export { InputRow };
