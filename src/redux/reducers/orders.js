const initialState = {
  orderList: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS': {
      return { ...state, orderList: action.payload };
    }
    default:
      return state;
  }
};

export default orders;
