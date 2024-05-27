import * as authorizationService from "../services/authorizationService.js"
import * as userService from "../services/userService.js";


export const signUp = async (req, res, next) => {
    try {
        const data = await authorizationService.signUpUser(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const data = await authorizationService.signInUser(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const changeAccountPassword = async (req, res, next) => {
    try {
        const data = await authorizationService.changePassword(req.body, req.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};






