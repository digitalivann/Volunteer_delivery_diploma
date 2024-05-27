import userRepo from "../repos/userRepo.js"
import {ConflictError, UnauthorizedError} from "../helpers/errorsTypes.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js"


export const signUpUser = async (data) => {

    const userByEmail = await userRepo.getUserByEmail(data.email);
    if (userByEmail) throw new ConflictError('Спробуйте інший імейл');

    const userByPhone = await userRepo.getUserByPhone(data.phone);
    if (userByPhone) throw new ConflictError('Спробуйте інший телефон');

    const unhashedPassword = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(unhashedPassword, salt);

    const userData = {...data, 'password': hashedPassword}
    const {password, ...user} = await userRepo.createInstance(userData);

    return user;
};

export const signInUser = async (data) => {
    const user = await userRepo.getUserByEmail(data.email)
    if (!user) throw new UnauthorizedError("Неправильний пароль або імейл!")

    const validPassword = await bcrypt.compare(data.password, user?.password);
    if (!validPassword || !user) throw new UnauthorizedError("Неправильний пароль або імейл");

    const token = await jwt.sign({
            id: user?.id,
            role: user?.role
        }
        , process.env.JWT, {
            expiresIn: '3d',
        });

    return({token, user})
};

export const changePassword = async (data, userId) => {
    const user = await userService.getUser(userId)

    const validPassword = await bcrypt.compare(data.password, user?.password);
    if (!validPassword) throw new UnauthorizedError("Неправильний старий пароль");

    const unhashedPassword = data.newPassword;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(unhashedPassword, salt);

    return userRepo.updateInstanceById({password: hashedPassword}, userId);
};




