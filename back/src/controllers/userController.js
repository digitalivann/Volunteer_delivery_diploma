import * as userService from "../services/userService.js"


export const getUser = async (req, res, next) => {
    try {
        const data = await userService.getUser(req.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const updateAccount = async (req, res, next) => {
    try {
        const data = await userService.updateInfoUser(req.body, req.id)
        res.json(data);
    } catch (error) {
        next(error);
    }
};
