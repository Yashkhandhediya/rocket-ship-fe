export const setAllReturns = (payload, callBack) => (dispatch) => {
  dispatch({ type: 'SET_All_RETURNS', payload });
  if(callBack) {
    callBack();
  }
};
