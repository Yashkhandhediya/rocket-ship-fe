export const setDomesticOrder = (payload) => (dispatch) => {
  dispatch({ type: 'SET_DOMESTIC_ORDER', payload });
};
export const resetDomesticOrder = () => (dispatch) => {
  dispatch({ type: 'RESET_DOMESTIC_ORDER'});
};