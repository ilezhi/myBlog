import React from 'react';
import { Route, IndexRoute } from 'react-router';


import App from '../app';
import Home from '../components/home';


const editArticle = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/admin/edit').default);
    }, 'editarticle');
};

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="article/edit/:id" getComponent={editArticle} />
    </Route>
);

export default routes;