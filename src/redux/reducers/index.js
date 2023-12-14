import { combineReducers } from 'redux';
import orders from './orders';
import addressList from './addAddressReducer';

export default combineReducers({ orders, addressList });
