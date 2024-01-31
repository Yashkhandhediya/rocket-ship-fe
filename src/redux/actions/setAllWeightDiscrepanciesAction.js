export const setAllWeightDiscrepancies = (payload, callBack) => (dispatch) => {
  dispatch({ type: 'SET_ALL_WEIGHT_DISCREPANCIES', payload });
  if(callBack) {
    callBack();
  }
};
