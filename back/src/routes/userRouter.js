import {Router} from "express";
import {checkAuthRole} from "../middlwares/authorizationMiddleware.js";
import {getUser} from "../controllers/userController.js";
import {catchErrors, catchValidationErrors} from "../middlwares/errorsMiddleware.js";
import {updateInfoValidator} from "../validators/userValidators.js";
import * as authController from "../controllers/authorizationController.js";
import * as userController from "../controllers/userController.js";


export const userRouter = new Router()

userRouter.get('', checkAuthRole("ANY"), getUser, catchErrors)
userRouter.post('/redact-profile', checkAuthRole("ANY"), updateInfoValidator, catchValidationErrors, userController.updateAccount, catchErrors)
