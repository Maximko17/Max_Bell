import React from "react";

const tableRow = (items, onDeleteItemClick, flag, orderAdditionals) => {
  return items.map(item => {
    const { id, name, price, worldDelivery, images } = item;
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
            <span>{name}</span>
          </div>
        </td>
        {getSize(itemindex, orderAdditionals, false)}
        {getCount(itemindex, orderAdditionals, false)}
        <td className="price-col">
          <b>
            {price * getCount(itemindex, orderAdditionals, true)[itemindex]} ₽ +
            <i>
              {worldDelivery *
                getCount(itemindex, orderAdditionals, true)[itemindex]}{" "}
              ₽
            </i>
          </b>
        </td>
        {flag ? (
          <td className="delete-col">
            <button onClick={() => onDeleteItemClick(id)}>
              <i className="far fa-trash-alt" />
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
    if (delivery_country === "РОССИЯ") {
      delivery = cloth.countryDelivery;
    } else {
      delivery = cloth.worldDelivery;
    }
    const { price } = cloth;
    const cloth_index = clothes.indexOf(cloth);

    const count = getCount(cloth_index, orderAdditionals, true)[cloth_index];
    totalPrice += count * price + count * delivery;
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
        totalPrice
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
              Заказ № ({uniqueId})
              <div className="order-date">Дата оформления ({updated})</div>
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
                            <th scope="col">Продукт</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Цена с доставкой</th>
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
                    <b>Страна:</b>
                    <div>{country}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Город:</b>
                    <div>{city}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>ФИО:</b>
                    <div>{fio}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Адрес:</b>
                    <div>{address}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Почтовый индекс:</b>
                    <div>{postcode}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Номер телефона:</b>
                    <div>{phoneNumber}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Email:</b>
                    <div>{email}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Примечание к заказу:</b>
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
                    <b>Статус:</b>
                    <div>{status}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Дата оформления:</b>
                    <div>{updated}</div>
                  </div>
                  <div className="previous-details-row">
                    <b>Итоговая цена:</b>
                    <div>{totalPrice} ₽</div>
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
