import * as pathService from "../services/pathService.js";


export const createNewPath = async (req, res, next) => {
    try {
        const data = await pathService.createPath(req.body, req.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getDriversPaths = async (req, res, next) => {
    try {
        const data = await pathService.getPathsForDriver(req.query.status, req.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getPath = async (req, res, next) => {
    try {
        const data = await pathService.getPath(req.params.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};


export const getPaths = async (req, res, next) => {
    try {
        const data = await pathService.getPaths(req.query)
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getPathFull = async (req, res, next) => {
    try {
        const data = await pathService.getPathInfoById(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getAllPathPlanned = async (req, res, next) => {
    try {
            const data = await pathService.getAllPlannedPath(req.query.filterData)
        res.json(data);
    } catch (error) {
        next(error);
    }
};


export const deletePath = async (req, res, next) => {
    try {
        const data = await pathService.deletePathById(parseInt(req.params.id))
        res.json(data);
    } catch (error) {
        next(error);
    }
};
