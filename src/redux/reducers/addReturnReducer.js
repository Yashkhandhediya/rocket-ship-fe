const initialState = {
    single_return: {},
};

const addOrder = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SINGLE_RETURN': {
            return {
                ...state,
                single_return: {
                    ...state.single_return,
                    ...action.payload,
                },
            };
        }
        default:
            return state;
    }
};

export default addOrder;
