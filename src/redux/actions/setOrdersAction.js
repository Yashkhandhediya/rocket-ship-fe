export const setAllOrders = (payload, callBack) => (dispatch) => {
  dispatch({ type: 'SET_All_ORDERS', payload });
  if(callBack) {
    callBack();
  }
};
