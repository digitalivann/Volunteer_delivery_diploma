import {addPathValidator} from "../validators/pathValidator.js";
import {checkAuthRole} from "../middlwares/authorizationMiddleware.js";
import {catchValidationErrors, catchErrors} from "../middlwares/errorsMiddleware.js";
import {Router} from "express";
import {addShipmentValidator, shipmentIdValidator} from "../validators/shipmentValidator.js";
import * as shipmentController from "../controllers/shipmentController.js";
export const shipmentRouter = new Router()

shipmentRouter.post('/add', checkAuthRole("VOLUNTEER"), addShipmentValidator, catchValidationErrors,
    shipmentController.createNewShipment, catchErrors)

shipmentRouter.patch('/ready/:id', checkAuthRole("VOLUNTEER"), shipmentController.setShipmentReady, catchErrors)

shipmentRouter.patch('/shipped/:id', checkAuthRole("DRIVER"), shipmentController.setHubstopShipmentsDelivered, catchErrors)

shipmentRouter.get('/volunteer', checkAuthRole("VOLUNTEER"),  shipmentController.getVolunteersShipments, catchErrors)

shipmentRouter.delete('/:id', checkAuthRole("VOLUNTEER"), shipmentController.deleteShipment, catchErrors)