export function register(username, password) {
    return getResponse("/weblab4/users/register", {
        username: username, password: password,
        roles: []
    }, 'POST', false)
}

export function login(username, password) {
    return getResponse('/weblab4/users/login', {username: username, password: password},
        'POST', false)
}

export function getAll() {
    return getResponse('/weblab4/points/getAll', {})
}

export function check(point) {
    return getResponse('/weblab4/points/check', point, "POST")
}

export function refresh() {
    return fetch('weblab4/users/refresh', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({refreshToken: sessionStorage.getItem("refreshToken")})
    });
}

export function clear() {
    return getResponse('/weblab4/points/clear')
}

function getResponse(url = '', data = null, method = 'GET', needToken = true) {
    let token = sessionStorage.getItem("token");
    let httpHeaders;
    if (needToken && token && token !== 'null') {
        httpHeaders = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    } else {
        httpHeaders = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        };
    }
    if (method === 'POST') {
        return fetch(url, {
            method: method,
            headers: httpHeaders,
            body: JSON.stringify(data)
        });
    } else {
        if (data !== null)
            url += '?' + new URLSearchParams(data).toString();
        return fetch(url, {
            method: method,
            headers: httpHeaders
        });
    }
}