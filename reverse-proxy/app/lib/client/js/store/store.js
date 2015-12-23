/* jshint esnext: true, node: true */
'use strict';

import { applyMiddleware, createStore, combineReducers } from 'redux';
import Reducers from './reducers';
import thunkMiddleware from 'redux-thunk';

let createAppStore = applyMiddleware(
  thunkMiddleware
)(createStore);

let appReducer = combineReducers({
  /* Edit and add your own reducers here */
  entries: Reducers.Entries
});

export default createAppStore(appReducer);
