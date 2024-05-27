import express, {Router} from "express";
import * as hubController from "../controllers/hubController.js";
import {checkAuthRole} from "../middlwares/authorizationMiddleware.js";
import {catchValidationErrors, catchErrors} from "../middlwares/errorsMiddleware.js";
import {addHubValidator, updateHubStatusValidator, updateHubValidator} from "../validators/hubValidator.js";
import {picturesStorage} from "../helpers/picturesStorage.js";

export const hubRouter = new Router()

hubRouter.post('/add', checkAuthRole("ADMIN"), picturesStorage.single("picture"), addHubValidator, catchValidationErrors,
    hubController.createNewHub, catchErrors);

hubRouter.put('/redact/:id', checkAuthRole("ADMIN"), updateHubValidator, catchValidationErrors,
    hubController.updateHub, catchErrors);

hubRouter.patch('/redact-status/:id', checkAuthRole("ADMIN"), updateHubStatusValidator, catchValidationErrors,
    hubController.updateHub, catchErrors);

hubRouter.post('/picture/add', checkAuthRole("ADMIN"), picturesStorage.single("picture"), (req, res,) => {
    res.json("/hub/picture/" + req.file.originalname)
})

hubRouter.use('/picture', express.static('pictures'), catchErrors)

hubRouter.get('/all', hubController.getAllHubs, catchErrors);

hubRouter.get('/empty', checkAuthRole("ANY"), hubController.getActiveHubs, catchErrors);

hubRouter.get('/admin', checkAuthRole("ADMIN"), hubController.getAdminsHubs, catchErrors);

hubRouter.get('/full/:id', hubController.getHubShipments, catchErrors);

hubRouter.get('/:id', hubController.getHub, catchErrors);

hubRouter.delete('/:id', checkAuthRole("ADMIN"), hubController.deleteHub, catchErrors);

