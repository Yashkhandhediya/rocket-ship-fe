const initialState = {};

const clonedOrder = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CLONED_ORDER': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default clonedOrder;
