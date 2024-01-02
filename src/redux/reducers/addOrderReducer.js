const initialState = {
  domestic_order: {},
  international_order: {},
  bulk_order: {},
  quickShipment: {},
};

const addOrder = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DOMESTIC_ORDER': {
      return {
        ...state,
        domestic_order: {
          ...state.domestic_order,
          ...action.payload,
        },
      };
    }
    case 'RESET_DOMESTIC_ORDER': {
      return {
        ...state,
        domestic_order: {},
      };
    }
    default:
      return state;
  }
};

export default addOrder;
