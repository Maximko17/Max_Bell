import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addNewItem,
  getItemImages
} from "../../../../../action/item-list-actions";
import {
  getProducerList,
  getTypeList
} from "../../../../../action/additional-actions";
import AddUpdateComponent from "../add-update-component/add-update-component";

class AddItem extends Component {
  componentDidMount() {
    const { security } = this.props;
    if (
      security.user.authority == "ROLE_USER" ||
      security.validToken == false
    ) {
      this.props.history.push("/");
    }
    this.props.getProducerList();
    this.props.getTypeList();
    this.props.getItemImages(999999);
  }
  submitAction = (newItem, url) => {
    this.props.addNewItem(newItem, this.props.history, url);
  };
  render() {
    return (
      <div>
        <AddUpdateComponent
          producers={this.props.additional.producers}
          types={this.props.additional.types}
          images={this.props.images}
          submitAction={this.submitAction}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

AddItem.propTypes = {
  addNewItem: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getProducerList: PropTypes.func.isRequired,
  getTypeList: PropTypes.func.isRequired,
  getItemImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  additional: state.additional,
  security: state.security,
  images: state.item.images
});
export default connect(
  mapStateToProps,
  { addNewItem, getProducerList, getTypeList, getItemImages }
)(AddItem);
