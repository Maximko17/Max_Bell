import React, { Component } from "react";
import {
  uploadItemImage,
  getItemImages,
  deleteImage
} from "../../../../../action/item-list-actions";
import "./drag-and-drop";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleFiles, initializeProgress } from "./drag-and-drop";

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

  // componentDidUpdate(prevProps) {
  //   if (this.props.images !== prevProps.images) {
  //     this.props.getItemImages(this.props.match.params.id);
  //   }
  // }
  onFormSubmit(e) {
    e.preventDefault();

    initializeProgress();
    uploadItemImage(this.state.file, this.props.match.params.id);

    this.setState({
      file: null
    });
  }

  onChange(e) {
    handleFiles(e.target.files);
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
            <i className="fa fa-trash-o" aria-hidden="true" />
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
            `File size ${files[i].name} exceeds 1MB. It will not load`
          );
        } else {
          dropMessage.innerHTML = "";
          filesArr.push(files[i]);
          console.log(files[i].type);
          console.log(files[i].size);
        }
      } else {
        errors.push(
          `File type ${
            files[i].name
          } does not match valid. Allowed PNG and JPG / JPEG File Types`
        );
      }
    }

    dropMessage.innerHTML = errors;
    this.setState({ file: filesArr });
    handleFiles(filesArr);
  }

  render() {
    return (
      <div>
        <div className="upload-form">
          <div className="add-title">Loading images</div>
          <div
            id="drop-area"
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
          >
            <form className="my-form" onSubmit={this.onFormSubmit}>
              <p>
                Load images using the file selection dialog or dragging the
                desired images into the selected area.
              </p>
              <input
                type="file"
                id="fileElem"
                multiple
                accept="image/*"
                onChange={this.onChange}
              />
              <label className="button" htmlFor="fileElem">
                Select images
              </label>
              <input type="submit" value="Сохранить" />
              <progress id="progress-bar" max={100} value={0} />

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
  images: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  images: state.item.images
});
export default connect(
  mapStateToProps,
  { getItemImages, deleteImage }
)(AddItemImage);
