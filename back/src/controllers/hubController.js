import * as hubService from "../services/hubService.js";
import * as hubstopService from "../services/hubstopService.js"
export const createNewHub = async (req, res, next) => {
    try {
        const data = await hubService.createHub(req.body, req.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getAllHubs = async (req, res, next) => {
    try {
        const data = await hubService.getAllHubs(req.query.filterData)
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getAdminsHubs = async (req, res, next) => {
    try {
        const data = await hubService.getHubsByAdminId(req.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getActiveHubs = async (req, res, next) => {
    try {
        const data = await hubService.getHubsFree()
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const updateHub = async (req, res, next) => {
    try {
        const data = await hubService.updateHubById(req.body, parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getHubShipments = async (req, res, next) => {
    try {
        const data = await hubstopService.getHubstopsForHubWithShipment(req.query.status, parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getHub = async (req, res, next) => {
    try {
        const data = await hubService.getHub(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const deleteHub = async (req, res, next) => {
    try {
        const data = await hubService.deleteHubById(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};