import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getItem,
  updateItem,
  deleteItem
} from "../../../../../action/item-list-actions";
import {
  getProducerList,
  getTypeList
} from "../../../../../action/additional-actions";
import AddUpdateComponent from "../add-update-component/add-update-component";

class UpdateItem_en extends Component {
  _id = this.props.match.params.id;

  componentDidMount() {
    const { security } = this.props;
    if (
      security.user.authority == "ROLE_USER" ||
      security.validToken == false
    ) {
      this.props.history.push("/en/");
    }
    this.props.getItem(this._id);
    this.props.getProducerList();
    this.props.getTypeList();
  }
  submitAction = (newItem, url) => {
    this.props.updateItem(newItem, this._id, this.props.history, url);
  };
  onDeleteAction = url => {
    this.props.deleteItem(this._id, this.props.history, url);
  };
  render() {
    return (
      <div>
        <AddUpdateComponent
          item={this.props.item}
          producers={this.props.additional.producers}
          types={this.props.additional.types}
          submitAction={this.submitAction}
          onDeleteAction={this.onDeleteAction}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

UpdateItem_en.propTypes = {
  updateItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getProducerList: PropTypes.func.isRequired,
  getTypeList: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  item: state.item.item,
  errors: state.errors,
  additional: state.additional,
  security: state.security
});

export default connect(
  mapStateToProps,
  {
    updateItem,
    getItem,
    deleteItem,
    getProducerList,
    getTypeList
  }
)(UpdateItem_en);
