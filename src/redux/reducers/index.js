import { combineReducers } from 'redux';
import ordersList from './setOrdersReducer';
import clonedOrder from './clonedOrderReducer';

export default combineReducers({ ordersList, clonedOrder });
