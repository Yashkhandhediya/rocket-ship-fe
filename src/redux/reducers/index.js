import { combineReducers } from 'redux';
import orders from './orders';
import ordersList from './setOrdersReducer';

export default combineReducers({ orders, ordersList });
