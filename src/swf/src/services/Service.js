import fetch from 'unfetch';


const getToken = () => {
    if (localStorage.getItem("currentUser") !== null) {
        const storage = JSON.parse(localStorage.getItem("currentUser"));
        return storage.token;
    } else {
        return "";
    }
}

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    // const error = new Error(response.statusText);
    // console.log(response.json());
    // error.response = response;
    return Promise.reject(response);
}

export const saveCheckIn = (checkIn) =>
    fetch("check/save", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getToken()
            },
            method: 'POST',
            body: JSON.stringify(checkIn)
        }
    ).then(checkStatus)

export const login = user =>
    fetch("user/login", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({"username": user.email, "password": user.password})
        }
    ).then(checkStatus);

export const register = user =>
    fetch("user/register", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user)
        }
    ).then(checkStatus)

export const getTodaysStatus = () =>
    fetch("check/today", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getToken()
            },
            method: 'GET',
        }
    ).then(checkStatus)

export const isCheckedIn = () =>
    fetch("check/checked", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getToken()
            },
            method: 'GET',
        }
    ).then(checkStatus)