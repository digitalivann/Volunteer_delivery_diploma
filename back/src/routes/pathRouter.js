import {addPathValidator, pathIdValidator} from "../validators/pathValidator.js";
import {checkAuthRole} from "../middlwares/authorizationMiddleware.js";
import {catchValidationErrors, catchErrors} from "../middlwares/errorsMiddleware.js";
import {Router} from "express";
import * as pathController from "../controllers/pathController.js"

export const pathRouter = new Router()

pathRouter.post('/add', checkAuthRole("DRIVER"), addPathValidator, catchValidationErrors, pathController.createNewPath, catchErrors)

pathRouter.get('/driver', checkAuthRole("DRIVER"), pathController.getDriversPaths, catchErrors)

pathRouter.delete('/:id', checkAuthRole("DRIVER"), pathController.deletePath, catchErrors)
//pathRouter.get('/:id', checkAuthRole("ANY"),pathIdValidator, catchValidationErrors, getPath, catchErrors)


pathRouter.get('/:id', pathController.getPathFull, catchErrors)

pathRouter.get('', catchValidationErrors, pathController.getAllPathPlanned, catchErrors)