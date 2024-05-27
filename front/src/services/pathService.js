import {server} from "../utils/requestMiddleware";

export const createPath = (pathData, callback, errorCallback) => {

    server.post('/path/add', {
        ...pathData
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

export const getPath = (pathId, callback, errorCallback) => {
    server.get(`/path/${pathId}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}

export const getPathActive = (callback, errorCallback) => {
    server.get('/path').then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}

export const getPathsShipments = (pathId, callback, errorCallback) => {

    server.get(`/path/full/${pathId}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err.response.data.error)
        }
    })
}

export const getDriversPaths = (status, callback, errorCallback) => {

    server.get(`/path/driver/?status=${status}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err.response.data.error)
        }
    })
}

export const getAllPathsPlanned = (filterData, callback, errorCallback) => {

    server.get(`/path/?filterData=${filterData}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err.response.data.error)
        }
    })
}

export const deletePath = (pathId, callback, errorCallback) => {

    server.delete(`/path/${pathId}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err.response.data.error)
        }
    })
}