import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import articles from './article';
import tags from './tag';

const rootReducers = combineReducers({
    articles,
    tags,
    routing,
});

export default rootReducers;