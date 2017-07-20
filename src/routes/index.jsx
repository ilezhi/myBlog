import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';


import App from '../app';
import Home from '../components/home';
import User from '../components/admin';
import List from '../components/admin/list';


const editArticle = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/admin/edit').default);
    }, 'editarticle');
};

const detailArticle = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/admin/detail').default);
    }, 'detailArticle')
}

const Login = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/admin/login').default);
    }, 'login');
};

const Profile = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/admin/profile').default);
    }, 'profile');
};

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="article" component={Home} />
        <Route path="article/:id" getComponent={detailArticle} />
        <Route path="admin" component={User}>
            <IndexRoute component={List} />
            <Route path="login" getComponent={Login} />
            <Route path="article" component={List} />
            <Route path="profile" getComponent={Profile} />
            <Route path="article/edit/:id" getComponent={editArticle} />
            <Route path="article/create" getComponent={editArticle} />
            <Route path="article/:id" getComponent={detailArticle} />
        </Route>
    </Route>
);

export default routes;