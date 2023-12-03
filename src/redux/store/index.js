// import { createStore, applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import combineReducers from '../reducers';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose/

const middlewares = (getDefaultMiddleWares) => getDefaultMiddleWares().concat(thunk);

const store = configureStore({
  reducer: combineReducers,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
