import React from "react";
import css from "./style.module.css";
import Button from "../Button";
import { connect } from "react-redux";

const OrderSummary = (props) => {
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд : </p>
      <ul>
        {Object.keys(props.ingredients).map((el) => (
          <li key={el}>
            {props.ingredientsNames[el]}:{props.ingredients[el]}
          </li>
        ))}
      </ul>
      <h3>
        <strong>Захиалгын дүн: {props.price} ₮</strong>
      </h3>
      <Button daragdsan={props.onCancel} btnType="Danger" text="ТАТГАЛЗАХ" />
      <Button daragdsan={props.onContinue} btnType="Success" text="ЗАХИАЛАХ" />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    ingredientsNames: state.burgerReducer.ingredients_names,
  };
};
export default connect(mapStateToProps)(OrderSummary);
