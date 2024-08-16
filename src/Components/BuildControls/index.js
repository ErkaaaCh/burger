import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/burgerActions";
import css from "./style.module.css";
import BuildContol from "../BuildControl";

const BuildControls = (props) => {
  const disabledIngredients = { ...props.ingredients };

  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }
  return (
    <div className={css.BuildControls}>
      <p>
        Бурнгерийн үнэ :<strong> {props.price}</strong>
      </p>

      {Object.keys(props.ingredientsNames).map((el) => (
        <BuildContol
          key={el}
          ortsNemeh={props.ortsNemeh}
          ortsHasah={props.ortsHasah}
          disabled={disabledIngredients}
          type={el}
          orts={props.ingredientsNames[el]}
        />
      ))}
      <button
        onClick={props.showConfirmModal}
        disabled={!props.purchasing}
        className={css.OrderButton}
      >
        Захиалах
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    purchasing: state.burgerReducer.purchasing,
    ingredientsNames: state.burgerReducer.ingredients_names,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ortsNemeh: (ortsNer) => dispatch(actions.addIngredient(ortsNer)),
    ortsHasah: (ortsNer) => dispatch(actions.removeIngredient(ortsNer)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
