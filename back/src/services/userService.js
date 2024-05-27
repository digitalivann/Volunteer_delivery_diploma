import userRepo from "../repos/userRepo.js";
import {ConflictError, NotFoundError, UnauthorizedError} from "../helpers/errorsTypes.js";
import * as userService from "./userService.js";

export const getUser = async (userId) => {
    const user = await userRepo.getInstanceById(userId);
    if (!user) throw new UnauthorizedError();

    return user
}

export const updateInfoUser = async (data, userId) => {
    const user = await userService.getUser(userId)

    return userRepo.updateInstanceById(data, userId)
};
