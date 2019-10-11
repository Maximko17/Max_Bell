import React from "react";
import { Link } from "react-router-dom";
import MappleToolTip from "reactjs-mappletooltip";

const getAllUsers = users => {
  const mappleConfig = {
    direction: "right"
  };
  return users.map(({ id, firstName, username, photo, authority, gender }) => {
    let role = "";
    if (authority && authority.authority == "ROLE_USER") {
      role = "Пользователь";
    } else {
      role = "Админ";
    }
    return (
      <tr key={id}>
        <th scope="row">
          <img
            src={`https://s3-us-west-1.amazonaws.com/clothes-store-basket/users/${photo}`}
            alt="User Image"
          />
        </th>
        <td>{firstName}</td>
        <td>{username}</td>
        <td>{gender}</td>
        <td>{role}</td>
        <td>
          <MappleToolTip {...mappleConfig}>
            <Link to={`#`}>
              <i className="fas fa-pencil-alt" aria-hidden="true" />
            </Link>
            <div>Подробнее</div>
          </MappleToolTip>
        </td>
      </tr>
    );
  });
};
export { getAllUsers };

const getAllOrders = orders => {
  const mappleConfig = {
    direction: "right"
  };
  return orders.map(({ id, customer, uniqueId, orderDetails }) => {
    return (
      <tr key={id}>
        <td>{uniqueId}</td>
        <td>{customer}</td>
        <td>{orderDetails && orderDetails.status}</td>
        <td>
          <MappleToolTip {...mappleConfig}>
            <Link to={`#`}>
              <i className="fas fa-pencil-alt" aria-hidden="true" />
            </Link>
            <div>Подробнее</div>
          </MappleToolTip>
        </td>
      </tr>
    );
  });
};
export { getAllOrders };

const getAllClothes = clothes => {
  const mappleConfig = {
    direction: "right"
  };
  return clothes.map(({ id, name, type, price, producer, images }) => {
    return (
      <tr key={id}>
        <th scope="row">
          <img
            src={
              images &&
              `https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/${
                images[0].image
              }`
            }
            alt="User Image"
          />
        </th>
        <td>{name}</td>
        <td>{price}</td>
        <td>{type}</td>
        <td>{producer}</td>
        <td id="edit-clothes">
          <MappleToolTip {...mappleConfig}>
            <Link to={`/catalog/clothes/update/${id}`}>
              <i className="fas fa-pencil-alt" aria-hidden="true" />
            </Link>
            <div>Подробнее</div>
          </MappleToolTip>
        </td>
      </tr>
    );
  });
};
export { getAllClothes };

const getAllReviewsReports = reports => {
  const mappleConfig = {
    direction: "right"
  };
  return reports.map(
    ({ id, userEmail, userName, userImage, totalReports, date }) => {
      return (
        <tr key={id}>
          <th scope="row">
            <img
              src={`https://s3-us-west-1.amazonaws.com/clothes-store-basket/users/${userImage}`}
              alt="User Image"
            />
          </th>
          <td>{userName}</td>
          <td>{userEmail}</td>
          <td>{date}</td>
          <td>{totalReports}</td>
          <td>
            <MappleToolTip {...mappleConfig}>
              <Link to={`#`}>
                <i class="fas fa-info" />
              </Link>
              <div>Подробнее</div>
            </MappleToolTip>
          </td>
          <td>
            <MappleToolTip {...mappleConfig}>
              <Link to={`#`}>
                <i className="far fa-trash-alt" aria-hidden="true" />
              </Link>
              <div>Удалить этот отзыв</div>
            </MappleToolTip>
          </td>
        </tr>
      );
    }
  );
};
export { getAllReviewsReports };
