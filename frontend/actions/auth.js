import fetch from "isomorphic-fetch";
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