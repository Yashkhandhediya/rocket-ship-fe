export const setAddress = (payload, callBack) => (dispatch) => {
  dispatch({ type: 'SET_ADDRESS', payload });
  callBack();
};
