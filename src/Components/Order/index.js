import React from "react";
import css from "./style.module.css";

const Order = (props) => {
  const { orts, hayag, dun } = props.order;

  return (
    <div className={css.Order}>
      <p>
        Орц : Гахайн мах : {orts.bacon}, Салад : {orts.salad}, Үхрийн мах :{" "}
        {orts.meat}, Бяслаг : {orts.cheese}
      </p>
      <p>
        Хаяг :{" "}
        {hayag
          ? `${hayag.name} | ${hayag.street} | ${hayag.city}`
          : "Хаяг олдсонгүй"}
      </p>
      <p>
        Үнийн дүн : <strong>{dun}₮</strong>
      </p>
    </div>
  );
};

export default Order;
