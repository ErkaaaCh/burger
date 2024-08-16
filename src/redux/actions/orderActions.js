import axios from "../../axios-orders";
export const loadOrders = (userID) => {
  return function (dispatch, getState) {
    dispatch(loadOrdersStart());
    const token = getState().signupReducer.token;

    axios
      .get(`/orders.json?&auth=${token}&orderBy="userID"&equalTo="${userID}"`)
      .then((response) => {
        const hha = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(hha));
      })
      .catch((err) => dispatch(loadOrdersError(err)));
  };
};
export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    dispatch(saveOrderStart());
    const token = getState().signupReducer.token;
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((response) => {
        dispatch(saveOrderSuccess());
      })
      .catch((error) => {
        dispatch(saveOrderError(error));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};
export const saveOrderError = (errorM) => {
  return {
    type: "SAVE_ORDER_ERROR",
    errorM,
  };
};
