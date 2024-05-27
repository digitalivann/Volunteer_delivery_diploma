import {server} from "../utils/requestMiddleware";

export const createHub = (hubData, callback, errorCallback) => {

    server.post('/hub/add', {
        ...hubData
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

export const getAllHubs = (filterData, callback, errorCallback) => {
    server.get(`/hub/all?filterData=${filterData}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}

export const getHubsActive = (callback, errorCallback) => {
    server.get('/hub/empty').then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}

export const getAdminsHubs = (callback, errorCallback) => {
    server.get('/hub/admin').then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}


export const updateHubInfo = (hubData, hubId, callback, errorCallback) => {

    server.put(`/hub/redact/${hubId}`, {
        ...hubData
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

export const getHub = (hubId, callback, errorCallback) => {
    server.get(`/hub/${hubId}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}

export const deleteHub = (hubId, callback, errorCallback) => {
    server.delete(`/hub/${hubId}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err);
        }
    })
}


export const updateHubStatus = (status, hubId, callback, errorCallback) => {

    server.patch(`/hub/redact-status/${hubId}`, {
        status: status
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