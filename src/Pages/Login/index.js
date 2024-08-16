import React, { Component  } from "react";
import css from "./style.module.css";
import Button from "../../Components/General/Button";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../Components/General/Spinner";
import signupreducer from "../../redux/reducer/signupreducer";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  logIn = () => {
    console.log("========state", this.state.email, this.state.password);
    this.props.login(this.state.email, this.state.password);
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div className={css.Login}>
        {this.props.userID && <Redirect to="/orders" />}
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имэйл хаяг"
          value={this.state.email}
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үг"
          value={this.state.password}
        />

        {this.props.logginIn && <Spinner />}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        <Button text="Login" btnType="Success" daragdsan={this.logIn} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    logginIn: state.signupReducer.logginIn,
    firebaseError: state.signupReducer.firebaseError,
    userID: state.signupReducer.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
