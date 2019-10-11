import React, { Component } from "react";
import ItemList_en from "../../navbar-components/item-list/item-list";

class SearchOutput_en extends Component {
  render() {
    const { input, sort } = this.props.match.params;
    const sortStr = sort.split("-");
    return (
      <ItemList_en
        isSearchList={true}
        url={`/catalog/search/${input}`}
        sort={sortStr[0]}
        ask_desk={sortStr[1]}
        history={this.props.history}
      />
    );
  }
}

export default SearchOutput_en;
