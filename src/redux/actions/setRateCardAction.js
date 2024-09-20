export const setRateCardData = (payload, callBack) => (dispatch) => {
  dispatch({ type: 'SET_RATE_CARD', payload });
  if (callBack) {
    callBack();
  }
};
