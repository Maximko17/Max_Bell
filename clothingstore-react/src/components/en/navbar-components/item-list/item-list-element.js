import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

const item = (items, authority, likes, user_id, addLikeFn, deleteLikeFn) => {
  return items.map(({ id, en_price, en_name, images, sizes, totalLikes }) => {
    const updateLink = (
      <Link to={`/en/catalog/clothes/update/${id}`}>
        <div className="clothes-props">
          <i className="fas fa-cogs" />
        </div>
      </Link>
    );
    const buyStyle = {
      padding: "0 0 0 45px"
    };
    return (
      <div className="clothes-view col-sm" key={id}>
        <div className="clothes-preview">
          <div className="clothes-price">{en_price}$</div>
          {authority &&
            getLikeButton(
              likes,
              totalLikes,
              id,
              user_id,
              addLikeFn,
              deleteLikeFn
            )}
          <div className="clothes-sizes">{getAllSizes(sizes)}</div>
          {authority == "ROLE_ADMIN" ? updateLink : ""}
          <Link to={`/en/catalog/full/${id}`}>
            <div className="clothes-buy-button" style={buyStyle}>
              <i className="fas fa-shopping-cart "> Buy</i>
            </div>
          </Link>
          <div className="clothes-image">
            <img
              src={
                "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
                images[0].image
              }
              alt="Foto"
            />
          </div>
        </div>
        <Link to={`/en/catalog/full/${id}`}>
          <div className="clothes-name">{en_name}</div>
        </Link>
      </div>
    );
  });
};
export { item };

const getAllSizes = sizes => {
  return sizes.map(({ id, sizeName, remaining }) => {
    if (remaining !== 0) {
      return (
        <div
          key={id}
          className="size"
          data-toggle="tooltip"
          data-placement="top"
          title="Are available"
        >
          {sizeName}
        </div>
      );
    } else {
      return (
        <div
          key={id}
          className="size null"
          data-toggle="tooltip"
          data-placement="top"
          title="Sold out"
        >
          {sizeName}
        </div>
      );
    }
  });
};

const getLikeButton = (
  likes,
  totalLikes,
  clothes_id,
  user_id,
  addLikeFn,
  deleteLikeFn
) => {
  if (findLikes(likes, clothes_id) !== -1) {
    return (
      <div className="clothes-like">
        <Button
          id={`PopoverFocus${clothes_id}`}
          color="danger"
          onClick={() => deleteLikeFn(user_id, clothes_id)}
        >
          <i className="fas fa-heart" /> {totalLikes}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="clothes-like">
        <Button
          id={`PopoverFocus${clothes_id}`}
          outline
          color="danger"
          onClick={() => addLikeFn(user_id, clothes_id)}
        >
          <i className="fas fa-heart" /> {totalLikes}
        </Button>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          target={`PopoverFocus${clothes_id}`}
        >
          <PopoverHeader>You like this!</PopoverHeader>
          <PopoverBody>
            Thanks for your like. Now this thing will become more popular.!
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    );
  }
};

function findLikes(array, value) {
  if (array.indexOf) {
    return array.indexOf(value);
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }

  return -1;
}
