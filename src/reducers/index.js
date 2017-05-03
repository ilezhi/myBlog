import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import articles from './article';

const rootReducers = combineReducers({
    articles,
    routing,
});

export default rootReducers;