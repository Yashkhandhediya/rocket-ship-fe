const initialState = [];

const addressList = (state = initialState, action) => {
  switch (action.type && action?.payload) {
    case 'SET_ADDRESS': {
      return [...state, action?.payload];
    }
    default:
      return state;
  } 
};

export default addressList;
