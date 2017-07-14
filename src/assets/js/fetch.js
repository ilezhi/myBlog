export default (url = '', type = 'GET', data = {}) => {
    type = type.toUpperCase();

    if (type === 'GET' && data) {
        const keys = Object.keys(data);
        if (keys.length !== 0) {
            let queryStr = keys.map(key => {
                return keys + '=' + data[keys];
            }).join('&');

            url = url + '?' + queryStr;
        } 
    }

    let requestConfig = {
        method: type,
        headers: {
            'Accept'      : 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    };

    if (type === 'POST') {
        Object.defineProperty(requestConfig, 'body', {
            value: JSON.stringify(data)
        });
    }

    return fetch(url, requestConfig);
}