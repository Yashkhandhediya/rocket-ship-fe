const initialState = null;

const weightDiscrepanciesList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_WEIGHT_DISCREPANCIES': {
      return action?.payload;
    }
    default:
      return state;
  }
};

export default weightDiscrepanciesList;
