const initialState = null;

const rateCardData = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RATE_CARD': {
      const updatedAddresses = action?.payload;
      return updatedAddresses;
    }
    default:
      return rateCardData;
  }
};

export default rateCardData;
