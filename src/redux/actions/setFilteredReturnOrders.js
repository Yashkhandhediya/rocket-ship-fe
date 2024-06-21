export const setFilteredReturnOrders = (payload, callBack) => (dispatch) => {
  dispatch({ type: 'SET_FILTERED_ORDERS', payload });
  if (callBack) {
    callBack();
  }
};
