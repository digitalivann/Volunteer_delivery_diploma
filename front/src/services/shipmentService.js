import {server} from "../utils/requestMiddleware";


export const getHubShipments = (hubId, status, callback, errorCallback) => {

    server.get(`/hub/full/${hubId}?status=${status}`).then(res => {
        if (callback != null) {
            callback(res);
        }
    }).catch(err => {
        if (errorCallback != null) {
            errorCallback(err.response.data.error)
        }
    })
}

export const createShipment = (shipmentData, callback, errorCallback) => {

    server.post('/shipment/add', {
        ...shipmentData
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

export const getVolunteerShipments = ( status, callback, errorCallback) => {

    server.get(`/shipment/volunteer/?status=${status}`).then(res => {
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


export const deleteShipment = (shipmentId, callback, errorCallback) => {

    server.delete(`/shipment/${shipmentId}`).then(res => {
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

export const setShipmentDelivered = (shipmentId, callback, errorCallback) => {

    server.patch(`/shipment/ready/${shipmentId}`).then(res => {
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

export const setHubstopShipmentsShipped = (hubstopId, callback, errorCallback) => {

    server.patch(`/shipment/shipped/${hubstopId}`).then(res => {
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