import axios from "axios";
import { loginUserSuccess } from "./loginActions";
export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCT1wsmZu6plCvNQQm2CT3ZJyIzr02FwRM",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userID = result.data.localId;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        dispatch(signupUserSuccess(token, userID));
      })
      .catch((err) => {
        console.error(
          "Signup Error:",
          err.response ? err.response.data : err.message
        );
        dispatch(signupUserError(err));
      });
  };
};

export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};

export const signupUserSuccess = (token, userID) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userID,
  };
};

export const signupUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};

export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyCT1wsmZu6plCvNQQm2CT3ZJyIzr02FwRM",
    //     {
    //       grant_type: "refresh_toke",
    //       refresh_toke: localStorage.get("refresh_token"),
    //     }
    //   )
    //   .then((result) => {
    //     const token = result.data.id_token;
    //     const userID = result.data.user_id;
    //     dispatch(loginUserSuccess(token, userID));
    //   })
    //   .catch((err) => {
    //     console.error(
    //       "Signup Error:",
    //       err.response ? err.response.data : err.message
    //     );
    //     dispatch(signupUserError(err));
    //   });
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};
