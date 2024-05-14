const initialState = {
    domestic_order: {},
    international_order: {},
    bulk_order: {},
    quickShipment: {},
  };
  
  const editOrder = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EDIT_ORDER': {
        return {
          ...state,
          domestic_order: {
            ...state.domestic_order,
            ...action.payload,
          },
        };
      }
      default:
        return state;
    }
  };
  
  export default editOrder;
  