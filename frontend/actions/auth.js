import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Router from "next/dist/next-server/lib/router/router";
import { API } from '../config';

export const handleResponse = response => {
    if (response.status === 401) {
        logout(() => {
            Router.push({
                pathname: "/login",
                query: {
                    message: "Sua sessao expirou. Por favor, entre novamente"
                }
            })
        })
    }
}

export const register = user => {
    return fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};

export const login = user => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const logout = (next) => {
    removeCookie("token")
    removeLocalStorage("user")
    next()

    return fetch(`${API}/logout`, {
        method: "GET"
    })
        .then(response => {
            console.log("Voce saiu com sucesso")
        })
        .catch(err => console.log(err))
};

// Set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// Get cookie
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};
// Localstorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};
// Authenticate the user by passing data to the cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem("user")) {
            let authUser = JSON.parse(localStorage.getItem("user"))

            authUser = user
            localStorage.setItem("user", JSON.stringify(authUser));
            next();
        }
    }
}

export const loginWithGoogle = user => {

    return fetch(`${API}/google-login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};