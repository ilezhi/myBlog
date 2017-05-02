'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from '../reducers';
import { syncHistoryWithStore } from 'react-router-redux';
import api from '../middleware/api';



export default function configureStore(initialState) {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunkMiddleware, api)
  );
}