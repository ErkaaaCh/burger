import React, { Component } from "react";
import css from "./style.module.css";

import Spinner from "../../Components/General/Spinner";
import Order from "../../Components/Order";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/orderActions";
class OrderPage extends React.Component {
  componentDidMount() {
    this.props.loadOrders(this.props.userID);
    // this.setState({ loading: true });
  }

  render() {
    // console.log("=============", JSON.stringify(this.state.orders));
    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.map((el) => <Order key={el[0]} order={el[1]} />)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    userID: state.signupReducer.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userID) => dispatch(actions.loadOrders(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
