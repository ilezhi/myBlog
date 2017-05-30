import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';


import App from '../app';
import Home from '../components/home';
import Article from '../components/admin';
import List from '../components/admin/list';


const editArticle = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/admin/edit').default);
    }, 'editarticle');
};

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="article" component={Home} />
        <Route path="admin/article" component={Article}>
            <IndexRoute component={List} />
            <Route path="edit/:id" getComponent={editArticle} />
            <Route path="create" getComponent={editArticle} />
        </Route>
    </Route>
);

export default routes;