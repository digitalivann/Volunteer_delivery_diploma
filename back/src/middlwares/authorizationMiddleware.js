import jwt from "jsonwebtoken"
import {NotFoundError} from "../helpers/errorsTypes.js";
import {getUser} from "../services/userService.js";
const {JsonWebTokenError, TokenExpiredError} = jwt;

export const checkAuthRole = (role) => {
    return async (req, res, next) => {
        try {
            const token = (req.headers.authorization || 'Empty').replace(/Bearer\s?/, '');
            const decodedToken = jwt.verify(token, process.env.JWT);
            await getUser(decodedToken.id)
            if (role !== "ANY") {
                if (decodedToken.role === role) {
                    req.id = decodedToken.id;
                    req.role = decodedToken.role
                } else {
                    return res.status(403).json({error: "Немає доступу"});
                }
            } else {
                req.id = decodedToken.id;
                req.role = decodedToken.role
            }

            next();
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundError) {
                return res.status(401).json({error: 'Неавторизований користувач'});
            }
            if (error instanceof JsonWebTokenError) {
                if (error instanceof TokenExpiredError) {
                    return res.status(401).json({error: 'Сесія закінчена'});
                }
                console.log(error)
                return res.status(401).json({error: 'Неавторизований користувач'});
            } else {
                next(error);
            }
        }
    }
}