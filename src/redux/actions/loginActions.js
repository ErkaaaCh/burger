import axios from "axios";
import * as actions from "./signupActions";
export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCT1wsmZu6plCvNQQm2CT3ZJyIzr02FwRM",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userID = result.data.localId;

        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(loginUserSuccess(token, userID));

        dispatch(actions.autoLogoutAfterMillisec(expiresIn * 1000));
      })
      .catch((err) => {
        console.error(
          "login Error:",
          err.response ? err.response.data : err.message
        );
        dispatch(loginUserError(err));
      });
  };
};

export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};

export const loginUserSuccess = (token, userID) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userID,
  };
};

export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};
