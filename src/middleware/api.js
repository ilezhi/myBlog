const API_ROOT = 'http://localhost:8000';


export default store => next => action => {
    let { types, shouldCallApi, endpoint, params } = action;
    console.log('进入api');
    console.log('types', types, endpoint);
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

    if (type.toUpperCase() === 'GET' && data) {
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
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(res => {
                let { code, msg, data} = res;
                if (code) {
                    console.log('throw code', code);
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
                console.log('err', err);
                return next({
                    type: failureType,
                    message: err.message
                });
            });
}