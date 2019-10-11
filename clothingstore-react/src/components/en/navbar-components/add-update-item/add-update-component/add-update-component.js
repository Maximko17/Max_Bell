import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

class AddUpdateComponent extends Component {
  state = {
    item: {
      name: "",
      en_name: "",
      type: "",
      en_type: "",
      producer: "",
      images: [],
      price: "",
      en_price: "",
      message: "",
      en_message: "",
      consist: "",
      en_consist: "",
      worldDelivery: "",
      en_worldDelivery: "",
      countryDelivery: "",
      en_countryDelivery: "",
      sizes: [
        { id: "", sizeName: "XS", remaining: 0 },
        { id: "", sizeName: "S", remaining: 0 },
        { id: "", sizeName: "M", remaining: 0 },
        { id: "", sizeName: "L", remaining: 0 },
        { id: "", sizeName: "XL", remaining: 0 }
      ]
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ ...this.state.fullItem, errors: nextProps.errors });
    }

    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const url = `/en/catalog/${this.state.item.type}`;
    const newItem = this.state.item;

    this.props.submitAction(newItem, url);
  };

  onChange = e => {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value }
    });
  };

  onSizeChange = (e, index) => {
    let sizeArray = this.state.item.sizes;
    sizeArray[index] = {
      ...sizeArray[index],
      remaining: e.target.value
    };

    this.setState({
      item: { ...this.state.item, sizes: sizeArray }
    });
  };

  getAdditionalElements = elements => {
    return elements.map(({ id, name }) => {
      return <option key={id}>{name}</option>;
    });
  };

  getAllImages = () => {
    if (this.props.item) {
      const { item } = this.props;
      return (
        item.images &&
        item.images.map(({ id, image }) => {
          return (
            <img
              src={
                "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
                image
              }
              key={id}
            />
          );
        })
      );
    } else {
      return this.props.images.map(({ id, image }) => {
        return (
          <img
            src={
              "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
              image
            }
            key={id}
          />
        );
      });
    }
  };
  render() {
    const { errors } = this.state;
    const { item } = this.state;
    const size_title = {
      marginTop: "50px"
    };
    const long_words = {
      lineHeight: "1.3"
    };
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-11 mt-4">
                <div className="add-title">Clothing information (RU)</div>
                <div className="add-info">
                  {InputRow(
                    "Name",
                    "name",
                    "Enter clothing name",
                    this.onChange,
                    item && item.name,
                    errors.name
                  )}
                  {SelectRow(
                    "Clothing type",
                    "type",
                    "--SELECT TYPE--",
                    this.onChange,
                    item && item.type,
                    errors.type,
                    this.getAdditionalElements,
                    this.props.types
                  )}
                  {SelectRow(
                    "Producer",
                    "producer",
                    "--SELECT PRODUCER--",
                    this.onChange,
                    item && item.producer,
                    errors.producer,
                    this.getAdditionalElements,
                    this.props.producers
                  )}
                  {InputRow(
                    "Price",
                    "price",
                    "Enter clothing price in rubles",
                    this.onChange,
                    item && item.price,
                    errors.price
                  )}
                  {InputRow(
                    "Description",
                    "message",
                    "Enter description about clothing",
                    this.onChange,
                    item && item.message,
                    errors.message
                  )}
                  {InputRow(
                    "Consist",
                    "consist",
                    "Enter clothing consist",
                    this.onChange,
                    item && item.consist,
                    errors.consist
                  )}
                  {InputRow(
                    "World delivery",
                    "worldDelivery",
                    "World delivery price",
                    this.onChange,
                    item && item.worldDelivery,
                    errors.worldDelivery
                  )}
                  {InputRow(
                    "Country delivery",
                    "countryDelivery",
                    "Country delivery price",
                    this.onChange,
                    item && item.countryDelivery,
                    errors.countryDelivery
                  )}
                </div>
              </div>

              <div className="col-xl-5 col-lg-11 add-content mt-4" id="one">
                <div className="add-title">Clothing information (EN)</div>
                <div className="add-info">
                  {InputRow(
                    "Name",
                    "en_name",
                    "Enter clothing name",
                    this.onChange,
                    item && item.en_name,
                    errors.en_name
                  )}
                  {SelectRow(
                    "Clothing type",
                    "type",
                    "--SELECT TYPE--",
                    this.onChange,
                    item && item.type,
                    errors.type,
                    this.getAdditionalElements,
                    this.props.types
                  )}
                  {SelectRow(
                    "Producer",
                    "producer",
                    "--SELECT PRODUCER--",
                    this.onChange,
                    item && item.producer,
                    errors.producer,
                    this.getAdditionalElements,
                    this.props.producers
                  )}
                  {InputRow(
                    "Price",
                    "en_price",
                    "Enter clothing price in rubles",
                    this.onChange,
                    item && item.en_price,
                    errors.en_price
                  )}
                  {InputRow(
                    "Description",
                    "en_message",
                    "Enter description about clothing",
                    this.onChange,
                    item && item.en_message,
                    errors.en_message
                  )}
                  {InputRow(
                    "Consist",
                    "en_consist",
                    "Enter clothing consist",
                    this.onChange,
                    item && item.en_consist,
                    errors.en_consist
                  )}
                  {InputRow(
                    "World delivery",
                    "en_worldDelivery",
                    "World delivery price (USD)",
                    this.onChange,
                    item && item.en_worldDelivery,
                    errors.en_worldDelivery
                  )}
                  {InputRow(
                    "Country delivery",
                    "en_countryDelivery",
                    "Country delivery price",
                    this.onChange,
                    item && item.en_countryDelivery,
                    errors.en_countryDelivery
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-11">
                <div className="add-title" style={size_title}>
                  Clothes sizes
                </div>
                <div className="add-sizes">
                  {SizeRow(
                    "XS",
                    "XS",
                    this.onSizeChange,
                    0,
                    item.sizes && item.sizes[0].remaining
                  )}
                  {SizeRow(
                    "S",
                    "S",
                    this.onSizeChange,
                    1,
                    item.sizes && item.sizes[1].remaining
                  )}
                  {SizeRow(
                    "M",
                    "M",
                    this.onSizeChange,
                    2,
                    item.sizes && item.sizes[2].remaining
                  )}
                  {SizeRow(
                    "L",
                    "L",
                    this.onSizeChange,
                    3,
                    item.sizes && item.sizes[3].remaining
                  )}
                  {SizeRow(
                    "XL",
                    "XL",
                    this.onSizeChange,
                    4,
                    item.sizes && item.sizes[4].remaining
                  )}
                </div>
              </div>
              <div className="col-xl-5 col-lg-11" id="two">
                <div>
                  <div style={size_title} className="add-title">
                    Clothing photo
                    {item.id ? (
                      <Link
                        to={"/en/catalog/clothes/add/images/" + item.id}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Add images"
                      >
                        <i className="fa fa-file-image-o" aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link
                        to={"/en/catalog/clothes/add/images/999999"}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Add images"
                      >
                        <i className="fa fa-file-image-o" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <div className="clothes-images">{this.getAllImages()}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="add-item text-center">
            <input type="submit" value={this.props.item ? "Save" : "Add"} />
          </div>
        </form>
        {this.props.item ? (
          <div className="delete-item">
            <button
              onClick={() =>
                this.props.onDeleteAction(`/catalog/${this.state.item.type}`)
              }
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AddUpdateComponent;

const InputRow = (fieldName, name, placeholder, onChange, value, errors) => {
  return (
    <div className="add-row">
      <div>{fieldName}:</div>
      <div>
        <input
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors
          })}
          type="text"
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

const SelectRow = (
  fieldName,
  name,
  placeholder,
  onChange,
  value,
  errors,
  getAdditionalElements,
  elements
) => {
  return (
    <div className="add-row">
      <div>{fieldName}:</div>
      <div>
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors
          })}
          name={name}
          onChange={e => onChange(e)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {getAdditionalElements(elements)}
        </select>
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </div>
  );
};
export { SelectRow };

const SizeRow = (fieldName, name, onSizeChange, index, value) => {
  return (
    <div className="each-size">
      <div>{fieldName}</div>
      <div>
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="123"
          name={name}
          onChange={e => onSizeChange(e, index)}
          value={value}
        />
      </div>
    </div>
  );
};
export { SizeRow };
