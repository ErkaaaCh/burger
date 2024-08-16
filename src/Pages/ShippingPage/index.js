import React, { Component } from "react";

import { connect } from "react-redux";
import css from "./style.module.css";
import Burger from "../../Components/Burger";
import Button from "../../Components/General/Button";
import ContactData from "../../Components/ContactData";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

class Shippingpage extends Component {
  cancelOrder = () => {
    this.props.history.goBack();
  };
  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };
  render() {
    return (
      <div className={css.Shippingpage}>
        <p style={{ fontSize: "24px" }}>
          <strong>Таны захиалга амттай байх болно....</strong>
        </p>
        <p style={{ fontSize: "24px" }}>
          <strong>Дүн : {this.props.price}₮</strong>
        </p>
        <Burger />
        <Button
          daragdsan={this.cancelOrder}
          btnType="Danger"
          text="Захиалгыг цуцлах"
        ></Button>
        <Button
          daragdsan={this.showContactData}
          btnType="Success"
          text="Хүргэлтийн мэдээлэл оруулах"
        ></Button>
        <Route path="/ship/contact" render={() => <ContactData />} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(Shippingpage);
