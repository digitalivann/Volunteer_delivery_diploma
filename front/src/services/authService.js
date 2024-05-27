import {server} from "../utils/requestMiddleware";

export const login = (userData, callback, errorCallback) => {

     server.post('/auth/sign-in', {
        ...userData
    }).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
         if (errorCallback != null) {
             if (err.response.status === 422) {
                 errorCallback(err.response.data[0].msg)
             } else {
                 errorCallback(err.response.data.error)
             }
         }
    })
}

export const register = (userData, callback, errorCallback) => {

    server.post('/auth/sign-up', {
        ...userData
    }).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            if (err.response.status === 400) {
                errorCallback(err.response.data[0].msg)
            } else {
                errorCallback(err.response.data.error)
            }
        }
    })
}

export const updatePassword = (userData, callback, errorCallback) => {

    server.patch('/auth/redact-password', {
        ...userData
    }).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            if (err.response.status === 422) {
                errorCallback(err.response.data[0].msg)
            } else {
                errorCallback(err.response.data.error)
            }
        }
    })
}


