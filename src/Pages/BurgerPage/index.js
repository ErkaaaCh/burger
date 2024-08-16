import React, { Component } from "react";
import Burger from "../../Components/Burger";
import BuildControls from "../../Components/BuildControls";
import Modal from "../../Components/General/Modal";
import OrderSummary from "../../Components/General/OrderSumary";
import axios from "../../axios-orders";
import Spinner from "../../Components/General/Spinner";

// const INGREDIENT_PRICES = { salad: 150, cheese: 250, bacon: 800, meat: 1500 };
// const INGREDIENT_NAMES = {
//   bacon: "Гахайн мах",
//   cheese: "Бяслаг",
//   meat: "Үхрийн мах",
//   salad: "Салад",
// };

class BurgerPage extends Component {
  state = {
    confirmOrder: false,
  };

  componentDidMount = () => {};

  continueOrder = () => {
    this.props.history.push("/ship");
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  // ortsNemeh = (type) => {
  //   const newIngredients = { ...this.props.burgeriinOrts };
  //   newIngredients[type]++;
  //   const newPrice = this.props.NiitUne + INGREDIENT_PRICES[type];
  //   this.setState({
  //     purchasing: true,
  //     totalPrice: newPrice,
  //     ingredients: newIngredients,
  //   });
  // };

  // ortsHasah = (type) => {
  //   if (this.props.burgeriinOrts[type] > 0) {
  //     const newIngredients = { ...this.props.burgeriinOrts };
  //     newIngredients[type]--;
  //     const newPrice = this.props.NiitUne - INGREDIENT_PRICES[type];
  //     this.setState({
  //       purchasing: newPrice > 1000,
  //       totalPrice: newPrice,
  //       ingredients: newIngredients,
  //     });
  //   }
  // };

  render() {
    return (
      <div>
        <Modal
          closeConfirmModal={this.closeConfirmModal}
          show={this.state.confirmOrder}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              onCancel={this.closeConfirmModal}
              onContinue={this.continueOrder}
            />
          )}
        </Modal>

        <Burger />
        <BuildControls
          showConfirmModal={this.showConfirmModal}
          disabled={!this.props.purchasing}
          // ortsHasah={this.props.burgereesOrtsHas}
          // ortsNemeh={this.props.burgertOrtsNem}
        />
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     burgeriinOrts: state.ingredients,
//     NiitUne: state.totalPrice,
//     purchasing: state.purchasing,
//     ingredients_names: state.ingredients_names,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     burgertOrtsNem: (ortsNer) => dispatch(actions.addIngredient(ortsNer)),
//     burgereesOrtsHas: (ortsNer) => dispatch(actions.removeIngredient(ortsNer)),
//   };
// };
export default BurgerPage;
