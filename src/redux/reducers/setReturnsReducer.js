const initialState = null;

const returnsList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_All_RETURNS': {
      const updatedAddresses = action?.payload;
      return updatedAddresses;
    }
    default:
      return state;
  }
};

export default returnsList;
