import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import articles from './article';
import tags from './tag';
import comment from './comment';
import user from './user';

const rootReducers = combineReducers({
    user,
    articles,
    tags,
    comment,
    routing,
});

export default rootReducers;