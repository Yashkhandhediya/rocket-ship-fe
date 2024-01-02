import { combineReducers } from 'redux';
import ordersList from './setOrdersReducer';
import clonedOrder from './clonedOrderReducer';
import addOrder from './addOrderReducer';

export default combineReducers({ ordersList, clonedOrder, addOrder });
