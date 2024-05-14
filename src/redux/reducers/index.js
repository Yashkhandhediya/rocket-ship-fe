import { combineReducers } from 'redux';
import ordersList from './setOrdersReducer';
import clonedOrder from './clonedOrderReducer';
import editOrder from './editOrderReducer';
import addOrder from './addOrderReducer';
import addReturn from './addReturnReducer'
import returnsList from './setReturnsReducer';
import weightDiscrepanciesList from './setWeightDiscrepanciesReducer';
export default combineReducers({ ordersList, clonedOrder, addOrder, addReturn, returnsList, weightDiscrepanciesList, editOrder });
