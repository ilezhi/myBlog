const API_ROOT = 'http://localhost:8000';
import fetch from '../assets/js/fetch';

export default store => next => action => {
    let { types, shouldCallApi, endpoint, params } = action;
    // 不是标准的request, success, failute 三种type
    if (typeof types === 'undefined') {
        return next(action);
    }

    if (typeof shouldCallApi === 'function') {
        if (!shouldCallApi(store.getState())) {
            // 使用缓存数据
            return false;
        }
    }

    const [requestType, successType, failureType] = types;

    const { type, data } = params;

    next({type: requestType});
    return fetch(endpoint, type, data)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(res => {
                let { code, msg, data} = res;
                if (code) {
                    throw new Error(msg);
                }

                return res;
            })
            .then(data => {
                
                return next({
                    type: successType,
                    data
                });
            })
            .catch(err => {
                return next({
                    type: failureType,
                    message: err.message
                });
            });
}