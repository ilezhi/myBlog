import './assets/css/reset.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { overrideComponentTypeChecker } from 'react-toolbox';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DevTools from './components/DevTools';

import configureStore from './store';
import App from './app';

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <App />
                <DevTools />
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