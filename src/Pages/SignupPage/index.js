import React, { Component } from "react";
import css from "./style.module.css";
import Button from "../../Components/General/Button";
import * as actions from "../../redux/actions/signupActions";
import { connect } from "react-redux";
import Spinner from "../../Components/General/Spinner";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
class Signup extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: "",
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  changePassword1 = (e) => {
    this.setState({ password1: e.target.value });
  };

  changePassword2 = (e) => {
    this.setState({ password2: e.target.value });
  };

  signup = () => {
    if (this.state.password1 === this.state.password2) {
      this.props.signupUser(this.state.email, this.state.password1);
    } else {
      this.setState({ error: "Нууц үгнүүд хоорондоо таарахгүй байна!" });
    }
  };

  render() {
    return (
      <div className={css.Signup}>
        {this.props.userID && <Redirect to="/" />}
        <h1>Бүртгэлийн форм</h1>
        <div>Та өөрийн мэдээллээ оруулна уу</div>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имэйл хаяг"
        />
        <input
          onChange={this.changePassword1}
          type="password"
          placeholder="Нууц үгээ оруулна уу"
        />
        <input
          onChange={this.changePassword2}
          type="password"
          placeholder="Нууц үгээ давтан оруулна уу"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        <div>
          {console.log(this.props.saving)} {this.props.saving && <Spinner />}
        </div>
        <Button text="БҮРТГҮҮЛЭХ" btnType="Success" daragdsan={this.signup} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    saving: state.signupReducer.saving,
    firebaseError: state.signupReducer.firebaseError,
    userID: state.signupReducer.userID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
