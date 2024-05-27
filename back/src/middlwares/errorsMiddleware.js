import {matchedData, validationResult} from "express-validator";
import {ConflictError, HttpError} from "../helpers/errorsTypes.js";
import pkg from '@prisma/client';
const {PrismaClientKnownRequestError} = pkg;


export const catchValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    } else {
        req.body = matchedData(req, {
            includeOptionals: true,
        })
        next();
    }
}

export const catchErrors = (error, req, res, next) => {

    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            if (error.meta.modelName === "Path")
                return res.status(409).json({error: "В маршруті є однакові запити"});
            if (error.meta.modelName === "Shipment")
                return res.status(409).json({error: "В посилці є однакові позиції"});
        }
    }

    if (error instanceof HttpError) {
        const {status, message} = error;
        console.log(error);
        return res.status(status).json({error: message});
    }

    console.log(error)
    res.status(500).json({error: 'Помилка на сервері'});

};