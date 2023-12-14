const localAddresses = localStorage.getItem('savedAddresses');
const initialState = localAddresses ? JSON.parse(localAddresses) : [];

const addressList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ADDRESS': {
      const updatedAddresses = action?.payload ? [...state, action?.payload] : state;
      localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
      return updatedAddresses;
    }
    default:
      return state;
  }
};

export default addressList;
