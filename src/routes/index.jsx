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

const Auth = (params, replace) => {
    let userInfo = sessionStorage.getItem('userInfo');
    if (!userInfo) {
        replace('/admin/login');
    }
};

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="article" component={Home} />
        <Route path="article/:id" getComponent={detailArticle} />
        <Route path="admin" component={User} onEnter={Auth}>
            <IndexRoute component={List} />
            <Route path="article" component={List} />
            <Route path="profile" getComponent={Profile} />
            <Route path="edit/:id" getComponent={editArticle} />
            <Route path="create" getComponent={editArticle} />
            <Route path=":id" getComponent={detailArticle} />
        </Route>
        <Route path="/admin/login" getComponent={Login} />
    </Route>
);

export default routes;