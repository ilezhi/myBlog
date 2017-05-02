import React from 'react';
import ReactDOM from 'react-dom';
import { overrideComponentTypeChecker } from 'react-toolbox';

import App from './App';
import './assets/js/rem';
import './assets/css/reset.css';

const render = () => {
    ReactDOM.render(
        <App />,
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
        module.hot.accept('./App', render);
    }
}


render();