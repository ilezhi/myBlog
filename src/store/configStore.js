'use strict';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducers from '../reducers';
import DevTools from '../components/DevTools';
import api from '../middleware/api';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducers,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, api, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}