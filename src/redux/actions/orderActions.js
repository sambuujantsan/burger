import axios from "../../axios-order";
export const loadOrders = () => {
  return function (dispatch, getState) {
    console.log("zahialga tataj ehelle")
    dispatch(loadOrdersStart());
    const token = getState().SignUpreducer.token;
    const userId = getState().SignUpreducer.userId;
    axios
      .get(`https://clown-e4929-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(response => {
        dispatch(loadOrdersSuccess(Object.entries(response.data).reverse()));
      })
      .catch(err => dispatch(loadOrdersError(err)))
  }
};
export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START"
  }
};
export const loadOrdersSuccess = loadedOrders => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders
  }
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error: error
  }
};




// Захиалгыг хадгалах
export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    //spinner ehluulne
    dispatch(saveOrderStart());
    const token = getState().SignUpreducer.token;
    //firebase-ruu ilgeene
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then(response => {
        dispatch(saveOrderSuccess());
      })
      .catch(error => {
        dispatch(saveOrderError(error));
      })
  }
};

export const saveOrderStart = () => {
  return {
    type: "SAVING_ORDER_STARTING"
  }
};
export const saveOrderSuccess = () => {
  return {
    type: "SAVED_ORDER_SUCCESS"
  }
};
export const saveOrderError = (error) => {
  return {
    type: "SAVED_ORDER_WITH_ERROR",
    error
  }
};
