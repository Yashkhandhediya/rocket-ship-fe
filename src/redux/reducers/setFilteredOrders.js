const initialState = null;

const filteredOrdersList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERED_ORDERS': {
      return action?.payload;
    }
    default:
      return state;
  }
};

export default filteredOrdersList;
