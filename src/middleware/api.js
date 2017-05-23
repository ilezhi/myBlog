const API_ROOT = 'http://localhost:8000';


export default store => next => action => {
    let { types, shouldCallApi, endpoint, params } = action;

    // 不是标准的request, success, failute 三种type
    if (typeof types === 'undefined') {
        return next(action);
    }

    if (typeof shouldCallApi === 'function') {
        if (!shouldCallApi(store.getState())) {
            console.log('cache');
            // 使用缓存数据
            return false;
        }
    }

    const [requestType, successType, failureType] = types;

    const { type, data } = params;
    let requestConfig = {
        method: type,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (type.toUpperCase() === 'GET') {
        let queryStr = '?' + Object.keys(data).map(key => {
            return key + '=' + data[key];
        }).join('&');

        endpoint += queryStr;
    } else {
        Object.defineProperty(requestConfig, 'body', {
            value: JSON.stringify(data)
        });
    }

    next({type: requestType});
    return fetch(endpoint, requestConfig)
            .then(res => res.json())
            .then(res => {
                let { code, msg, data} = res;
                if (code) {
                    return Promise.reject(msg);
                }

                return data;
            })
            .then(data => {
                
                return next({
                    type: successType,
                    data
                });
            })
            .catch(err => {
                console.log('err', err);
                return next({
                    type: failureType,
                    message: err.message || err
                });
            });
}