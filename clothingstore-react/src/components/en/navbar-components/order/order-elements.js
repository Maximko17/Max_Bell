import React from "react";

const tableRow = (items, onDeleteItemClick, flag, orderAdditionals) => {
  return items.map(item => {
    const { id, en_name, en_price, en_worldDelivery, images } = item;
    const itemindex = items.indexOf(item);
    return (
      <tr key={itemindex}>
        <td scope="row" className="product-col justify-content-center">
          <div>
            <span>
              <img
                src={
                  images &&
                  "https://s3-us-west-1.amazonaws.com/clothes-store-basket/clothes/" +
                    images[0].image
                }
                alt="Image"
              />
            </span>
          </div>
        </td>
        <td className="product-name-col">
          <div>
            <span>{en_name}</span>
          </div>
        </td>
        {getSize(itemindex, orderAdditionals, false)}
        {getCount(itemindex, orderAdditionals, false)}
        <td className="price-col">
          <b>
            {en_price * getCount(itemindex, orderAdditionals, true)[itemindex]}{" "}
            $ +
            <i>
              {en_worldDelivery *
                getCount(itemindex, orderAdditionals, true)[itemindex]}{" "}
              $
            </i>
          </b>
        </td>
        {flag ? (
          <td className="delete-col">
            <button onClick={() => onDeleteItemClick(id)}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
          </td>
        ) : (
          <td />
        )}
      </tr>
    );
  });
};
export { tableRow };

const getSize = (clothes_index, additionals, str) => {
  return additionals.map(additional => {
    const { size } = additional;
    const additional_index = additionals.indexOf(additional);

    if (additional_index === clothes_index) {
      if (str) {
        return size;
      } else {
        return (
          <td className="size-col" key={additional_index}>
            {size}
          </td>
        );
      }
    }
  });
};
export { getSize };

const getCount = (clothes_index, additionals, digit) => {
  return additionals.map(additional => {
    const { count } = additional;
    const additional_index = additionals.indexOf(additional);

    if (additional_index === clothes_index) {
      if (digit) {
        return count;
      } else {
        return (
          <td className="count-col" key={additional_index}>
            {count}
          </td>
        );
      }
    }
  });
};
export { getCount };

const getTotalPrice = (clothes, orderAdditionals, delivery_country) => {
  let totalPrice = 0;

  clothes.map(cloth => {
    let delivery = 0;
    if (delivery_country === "RUSSIA") {
      delivery = cloth.en_countryDelivery;
    } else {
      delivery = cloth.en_worldDelivery;
    }
    const { en_price } = cloth;
    const cloth_index = clothes.indexOf(cloth);

    const count = getCount(cloth_index, orderAdditionals, true)[cloth_index];
    totalPrice += count * en_price + count * delivery;
  });

  return totalPrice;
};
export { getTotalPrice };

const getPreviousOrders = orders => {
  return orders.map(
    ({ orderDetails, clothes, id, uniqueId, orderAdditionals }) => {
      const {
        country,
        city,
        fio,
        address,
        postcode,
        phoneNumber,
        email,
        orderWishes,
        status,
        updated,
        totalPriceUSD
      } = orderDetails;
      const flag = false;
      return (
        <div className="col-lg-12 mt-4" key={id}>
          <button
            className="previous-order"
            data-toggle="collapse"
            data-target={`.multi-collapse${uniqueId}`}
            aria-expanded="false"
            aria-controls={`${uniqueId}1 ${uniqueId}2 ${uniqueId}3`}
          >
            <div>
              Order № ({uniqueId})
              <div className="order-date">Date of issue ({updated})</div>
            </div>
          </button>
          <div className="row">
            <div className="col">
              <div
                className={`collapse multi-collapse${uniqueId}`}
                id={`${uniqueId}1`}
              >
                <div className="card card-body">
                  <div className="container order">
                    <div className="row">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Count</th>
                            <th scope="col">Price with delivery</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {tableRow(clothes, null, flag, orderAdditionals)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <div
                className={`collapse multi-collapse${uniqueId}`}
                id={`${uniqueId}2`}
              >
                <div className="card card-body">
                  <div className="previous-details-row">
                    <b>Country:</b>
                    <div>{country}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>City:</b>
                    <div>{city}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Full name:</b>
                    <div>{fio}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Address:</b>
                    <div>{address}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Postcode:</b>
                    <div>{postcode}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Phone number:</b>
                    <div>{phoneNumber}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Email:</b>
                    <div>{email}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Order wishes:</b>
                    <div>{orderWishes}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div
                className={`collapse multi-collapse${uniqueId}`}
                id={`${uniqueId}3`}
              >
                <div className="card card-body">
                  <div className="previous-details-row">
                    <b>Status:</b>
                    <div>{status}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Date of issue:</b>
                    <div>{updated}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Total price:</b>
                    <div>{totalPriceUSD} $</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
};

export { getPreviousOrders };
