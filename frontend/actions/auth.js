import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";

export const register = (user) => {
    return fetch(`${ API }/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}

export const login = (user) => {
    return fetch(`${ API }/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}

// Set Cookie
export const setCookie = (key, value) => {
    if(process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = (key) => {
    if(process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// Retrieve Cookie

export const getCookie = (key) => {
    if(process.browser) {
        cookie.get(key);
    }
};

// Retrieve info from Localstorage
export const setLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if(process.browser) {
        localStorage.removeItem(key)
    }
}

// Authenticate user's method
export const authenticate = (data, next) => {
    setCookie("token", data.token)
    setLocalStorage("user", data.user)
    next();
};

export const isAuthorized = () => {
    if(process.browser) {
        const cookieConfirmed = getCookie("token")
        if(cookieConfirmed) {
            if(localStorage.getItem("user")) {
                return JSON.parse(localStorage.getItem("user"))
            } else {
                return false;
            }
        }
    }
}