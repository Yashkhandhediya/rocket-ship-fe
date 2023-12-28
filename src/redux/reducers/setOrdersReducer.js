const initialState = null;

const ordersList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_All_ORDERS': {
      const updatedAddresses = action?.payload;
      return updatedAddresses;
    }
    default:
      return state;
  }
};

export default ordersList;
