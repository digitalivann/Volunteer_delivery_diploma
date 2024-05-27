import * as shipmentService from "../services/shipmentService.js";

export const createNewShipment = async (req, res, next) => {
    try {
        const data = await shipmentService.createShipment(req.body, req.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const setShipmentReady = async (req, res, next) => {
    try {
        const data = await shipmentService.updateShipmentStatusReady(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};
export const setHubstopShipmentsDelivered = async (req, res, next) => {
    try {
        const data = await shipmentService.updateShipmentsStatusShippedByHubstop(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getVolunteersShipments = async (req, res, next) => {
    try {
        const data = await shipmentService.getVolunteerShipments(req.query.status, req.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};


export const deleteShipment = async (req, res, next) => {
    try {
        const data = await shipmentService.deleteShipmentById(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};
