import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import articles from './article';
import tags from './tag';
import comment from './comment';

const rootReducers = combineReducers({
    articles,
    tags,
    comment,
    routing,
});

export default rootReducers;