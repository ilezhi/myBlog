const API_ROOT = 'http://localhost:8000';


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
    next({type: requestType});

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

    return fetch(endpoint, requestConfig)
            .then(res => res.json())
            .then(res => {
                let { code, msg, data} = res;
                if (code !== 200) {
                    return Promise.reject(msg);
                }

                return data;
            })
            .then(data => {
                return next({
                    type: successType,
                    ...data
                });
            })
            .catch(err => {
                return next({
                    type: failure,
                    message: err.message || err
                });
            });
}