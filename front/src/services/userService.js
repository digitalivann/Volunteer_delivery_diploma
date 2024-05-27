import {server} from "../utils/requestMiddleware";

export const getUserFromToken = (callback, errorCallback) => {

    server.get('/user').then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err)
        }
    })
}

export const updateProfile = (userData, callback, errorCallback) => {

    server.post('/user/redact-profile', {
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