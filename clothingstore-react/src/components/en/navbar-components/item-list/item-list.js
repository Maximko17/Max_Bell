import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getItemList,
  getItemsLikes,
  addItemLike,
  deleteItemLike
} from "../../../../action/item-list-actions";
import { Link } from "react-router-dom";
import { item } from "./item-list-element.js";
import Pagination_en from "../pagination/pagination";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class ItemList_en extends Component {
  getUrl = () => {
    let url = "";
    if (this.props.isSearchList) {
      url = this.props.url;
    } else {
      url = "/catalog/" + this.props.match.params.url;
    }
    return url;
  };

  getAction = (page = 0, size = 3) => {
    if (this.props.isSearchList) {
      const { sort, ask_desk, history } = this.props;
      this.props.getItemList(
        this.getUrl(),
        page,
        size,
        sort,
        ask_desk,
        history
      );
    } else {
      const { history } = this.props;
      this.props.getItemList(this.getUrl(), page, size, "id", "desc", history);
    }
  };

  componentDidMount() {
    const { id } = this.props.security.user;
    this.getAction();
    this.props.getItemsLikes(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSearchList) {
      const { url, sort, ask_desk, history } = prevProps;
      if (
        this.props.sort !== sort ||
        this.props.ask_desk !== ask_desk ||
        this.props.url !== url
      ) {
        this.props.getItemList(
          this.getUrl(),
          0,
          3,
          this.props.sort,
          this.props.ask_desk,
          history
        );
      }
    } else {
      const { history } = prevProps;
      if (this.props.match.url != prevProps.match.url) {
        this.props.getItemList(this.getUrl(), 0, 3, "id", "desc", history);
      }
    }
  }

  render() {
    const { content, totalPages, number, size, last } = this.props.items;
    const { authority, id } = this.props.security.user;
    const { likes } = this.props;
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              {content &&
                item(
                  content,
                  authority,
                  likes,
                  id,
                  this.props.addItemLike,
                  this.props.deleteItemLike
                )}
            </div>
          </div>
          {authority == "ROLE_ADMIN" ? (
            <div className="add-item">
              <Link to={`/en/clothes/add`}>
                <div>Add product</div>
              </Link>
            </div>
          ) : (
            <div />
          )}
        </ReactCSSTransitionGroup>
        <Pagination_en
          totalPages={totalPages}
          number={number}
          size={size}
          last={last}
          getAction={this.getAction}
        />
      </div>
    );
  }
}

ItemList_en.propTypes = {
  getItemList: PropTypes.func.isRequired,
  getItemsLikes: PropTypes.func.isRequired,
  addItemLike: PropTypes.func.isRequired,
  deleteItemLike: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  likes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  items: state.item.items,
  likes: state.item.likes,
  security: state.security
});
export default connect(
  mapStateToProps,
  { getItemList, getItemsLikes, addItemLike, deleteItemLike }
)(ItemList_en);
