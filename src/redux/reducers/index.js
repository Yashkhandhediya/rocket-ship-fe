import { combineReducers } from 'redux';
import ordersList from './setOrdersReducer';
import clonedOrder from './clonedOrderReducer';
import addOrder from './addOrderReducer';
import addReturn from './addReturnReducer'
export default combineReducers({ ordersList, clonedOrder, addOrder, addReturn });
