import {body, param, query} from "express-validator";
import {BadRequestError} from "../helpers/errorsTypes.js";



export const addPathValidator = [
    body("stops.*.city", "Місто має бути не коротше 2 символів").isLength({min: 2}),
    body("stops.*.region", "Неправвильна область України").isIn(["АР Крим", "Вінницька область", "Волинська область", "Дніпропетровська область", "Донецька область", "Житомирська область", "Запорізька область", "Закарпатська область", "Івано-Франківська область", "Київська область",
       "Кіровоградська область", "Леганська область", "Львівська область", "Миколаївська область", "Одеська область", "Полтавська область", "Рівненська область", "Сумська область",
     "Тернопільська область", "Харківська область", "Херсонська область", "Чернігівська область", "Черкаська область", "Чернівецька область", "Хмельницька область"]),
    body("destination", "Назва пункту призначення має бути не коротше 2 символів").isLength({min: 2}),
    body('startTime', 'Неправильний формат дати').isISO8601().toDate().notEmpty(),
    body('notes').optional(),
    body("stops", "Немає зупинок у хабі").isArray({ min: 1 }),
    body("stops", "Немає айді зупинок-хабів").notEmpty(),
    body("stops.*.id", "Нечисельне айді хабу").isNumeric().toInt(),
    body("needs.*.name", "Назва потреби має бути не коротше 2 символів").isLength({min: 2}),
    body("needs.*.type", "Тип потреби повинен бути визначеним").isIn(["FOOD", "CLOTHES", "MEDICINE", "GADGETS", "OTHER", "MATERIALS"]),
]
export const pathIdValidator = [
    param("id").isNumeric().toInt().notEmpty(),
]
