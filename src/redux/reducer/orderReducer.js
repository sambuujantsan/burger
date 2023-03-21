const initialState = {
  //load order

  orders: [],
  loading: false,
  error: null,

  //save order

  newOrder: {
    save: false,
    finished: false,
    error: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ORDERS_START": return {
      ...state,
      loading: true
    };
    case "LOAD_ORDERS_SUCCESS": return {
      ...state,
      loading: false,
      orders: action.orders
    };
    case "LOAD_ORDERS_ERROR": return {
      ...state,
      loading: false,
      error: action.error
    };

    //SAVING ORDER CASES

    case "SAVING_ORDER_STARTING": return {
      ...state,
      newOrder: {
        ...state.newOrder,
        save: true,
        finished: true,
        error: null
      }
    };

    case "SAVED_ORDER_SUCCESS": return {
      ...state,
      newOrder: {
        ...state.newOrder,
        save: false,
        finished: false,
        error: null
      }
    };
    case "SAVED_ORDER_WITH_ERROR": return {
      ...state,
      newOrder: {
        ...state.newOrder,
        save: false,
        finished: true,
        error: action.error
      }
    };
    default:
      return {
        ...state,
        loading: false,
      };

  };
}
export default reducer;
