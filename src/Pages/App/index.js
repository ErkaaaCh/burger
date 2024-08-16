import css from "./style.module.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Toolbar from "../../Components/ToolBar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../Components/SideBar";
import { Component } from "react";
import OrderPage from "../OrderPage";
import { Route, Routes, Switch } from "react-router-dom";
import Shippingpage from "../ShippingPage";
import Login from "../Login";
import Signup from "../SignupPage";
import Logout from "../../Components/Logout";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/loginActions";
import * as signupActions from "../../redux/actions/signupActions";
class App extends Component {
  state = {
    showSidebar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        this.props.autoLogin(token, userID);
        this.props.autoLogoutAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        this.props.logout();
      }
    }
  };
  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />

        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
          {this.props.userID ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={Shippingpage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />

              <Route path="/signup" component={Signup} />
              <Redirect to="/login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userID: state.signupReducer.userID,
  };
};
const mapDispatchToProps = (dispatch) => ({
  autoLogin: (token, userID) =>
    dispatch(actions.loginUserSuccess(token, userID)),
  logout: () => dispatch(signupActions.logout()),
  autoLogoutAfterMillisec: () =>
    dispatch(signupActions.autoLogoutAfterMillisec()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
