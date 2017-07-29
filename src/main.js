import 'babel-polyfill';
import './assets/css/reset.css';
import './assets/js/rem.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { overrideComponentTypeChecker } from 'react-toolbox';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import DevTools from './components/DevTools';

import routes from './routes';
import configureStore from './store';
import App from './app';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <Router history={history} routes={routes} />
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : false}
            </div>
        </Provider>,
        document.getElementById('app')
    );
};

if (process.env.NODE_ENV !== 'production') {
    overrideComponentTypeChecker((classType, reactElement) => (
        reactElement && (
        reactElement.type === classType
        || reactElement.type.name === classType.displayName
        )
    ));
    if (module.hot) {
        module.hot.accept('./app', render);
    }
}


render();