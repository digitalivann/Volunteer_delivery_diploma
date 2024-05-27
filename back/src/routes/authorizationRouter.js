import {Router} from "express";
import * as authController from "../controllers/authorizationController.js";
import {
    signUpValidator,
    signInValidator,
    updateInfoValidator,
    changePasswordValidator
} from "../validators/userValidators.js";
import {catchValidationErrors, catchErrors} from "../middlwares/errorsMiddleware.js";
import {checkAuthRole} from "../middlwares/authorizationMiddleware.js";
import * as userController from "../controllers/userController.js";
import {userRouter} from "./userRouter.js";
import * as authService from "../services/authorizationService.js";

export const authRouter = new Router()

authRouter.post('/sign-up', signUpValidator, catchValidationErrors, authController.signUp, catchErrors)
authRouter.post('/sign-in', signInValidator, catchValidationErrors, authController.signIn, catchErrors)
authRouter.patch('/redact-password', checkAuthRole("ANY"), changePasswordValidator, catchValidationErrors,
    authController.changeAccountPassword, catchErrors)