import React, { Component } from "react";
import {
  uploadItemImage,
  getItemImages,
  deleteImage
} from "../../../../../action/item-list-actions";
import "./add-item-image.css";
import "./drag-and-drop";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleFiles } from "./drag-and-drop";

class AddItemImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const { security } = this.props;
    if (
      security.user.authority == "ROLE_USER" ||
      security.validToken == false
    ) {
      this.props.history.push("/");
    }
    this.props.getItemImages(this.props.match.params.id);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.uploadItemImage(this.state.file, this.props.match.params.id);

    this.setState({
      file: null
    });
  }

  onChange(e) {
    handleFiles(e.target.files, "gallery");
    this.setState({ file: e.target.files });
  }

  getAllImages = () => {
    const { images } = this.props;
    return images.map(({ id, image }) => {
      return (
        <div className="upload-images" key={id}>
          <img
            src={
              "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
              image
            }
            className="each-image"
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.deleteImage(id)}
          >
            <i className="far fa-trash-alt" />
          </button>
        </div>
      );
    });
  };

  onDragEnter(e) {
    let dropArea = document.getElementById("drop-area");

    e.preventDefault();
    e.stopPropagation();

    dropArea.classList.add("highlight");
  }
  onDragOver(e) {
    let dropArea = document.getElementById("drop-area");

    e.preventDefault();
    e.stopPropagation();

    dropArea.classList.add("highlight");
  }
  onDragLeave(e) {
    let dropArea = document.getElementById("drop-area");

    e.preventDefault();
    e.stopPropagation();

    dropArea.classList.remove("highlight");
  }
  onDrop(e) {
    let dropArea = document.getElementById("drop-area");
    let dropMessage = document.getElementById("message");

    e.preventDefault();
    e.stopPropagation();

    dropArea.classList.remove("highlight");
    let dt = e.dataTransfer;
    let files = dt.files;
    let filesArr = [];
    let errors = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type == "image/png" || files[i].type == "image/jpeg") {
        if (files[i].size > 1000000) {
          errors.push(
            `Размер файла ${files[i].name} превышает 1МБ. Он не будет загружен`
          );
        } else {
          dropMessage.innerHTML = "";
          filesArr.push(files[i]);
        }
      } else {
        errors.push(
          `Тип файла ${
            files[i].name
          } не соответствует допустимым. Допустимые типы файлов PNG и JPG/JPEG`
        );
      }
    }

    dropMessage.innerHTML = errors;
    this.setState({ file: filesArr });
    handleFiles(filesArr, "gallery");
  }

  render() {
    return (
      <div>
        <div className="upload-form">
          <div className="add-title">Загрузка изображений</div>
          <div
            id="drop-area"
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
          >
            <form className="my-form" onSubmit={this.onFormSubmit}>
              <p>
                Загрузите изображения с помощью диалога выбора файлов или
                перетащив нужные изображения в выделенную область
              </p>
              <input
                type="file"
                id="fileElem"
                multiple
                accept="image/*"
                onChange={this.onChange}
              />
              <label className="button" htmlFor="fileElem">
                Выбрать изображения
              </label>
              <input type="submit" value="Сохранить" />

              <div id="gallery" />
              <div id="message" />
            </form>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            {this.getAllImages()}
          </div>
        </div>
      </div>
    );
  }
}

AddItemImage.propTypes = {
  getItemImages: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  uploadItemImage: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  images: state.item.images
});
export default connect(
  mapStateToProps,
  { getItemImages, deleteImage, uploadItemImage }
)(AddItemImage);
