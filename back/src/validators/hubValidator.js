import {body, check, param} from "express-validator";
import {BadRequestError} from "../helpers/errorsTypes.js";



export const addHubValidator = [
    body("name", "Назва хабу має бути не коротше 2 символів").isLength({min: 2}).notEmpty(),
    body("city", "Місто хабу має бути не коротше 2 символів").isLength({min: 2}).notEmpty(),
    body("region", "Неправвильна область України").isIn(["АР Крим", "Вінницька область", "Волинська область", "Дніпропетровська область", "Донецька область", "Житомирська область", "Запорізька область", "Закарпатська область", "Івано-Франківська область", "Київська область",
        "Кіровоградська область", "Луганська область", "Львівська область", "Миколаївська область", "Одеська область", "Полтавська область", "Рівненська область", "Сумська область",
        "Тернопільська область", "Харківська область", "Херсонська область", "Чернігівська область", "Черкаська область", "Чернівецька область", "Хмельницька область"]),
    body("startHour", "Неправильна година початку роботи").toInt().isInt({min: 0, max: 24}).notEmpty(),
    body("endHour", "Неправильна година закінчення роботи").toInt().isInt({
        min: 0,
        max: 24
    }).custom((endHour, {req}) => {
        if (req.body.startHour >= req.body.endHour) {
            throw new BadRequestError('Година закінчення роботи повинна бути більша за початок');
        }
        return true;
    }).notEmpty(),
    body("phone", "Невірний формат телефону").isLength({min: 10}).isMobilePhone("any").notEmpty(),
    body("address", "Адреса хабу має бути коротше 2 символів").isLength({min: 2}).notEmpty(),
    body("photoUrl", "Додайте фото хабу").notEmpty()
]

export const updateHubValidator = [
    body("name", "Назва хабу має бути не коротше 2 символів").isLength({min: 2}).notEmpty(),
    body("startHour", "Неправильна година початку роботи").toInt().isInt({min: 0, max: 24}).notEmpty(),
    body("endHour", "Неправильна година закінчення роботи").toInt().isInt({
        min: 0,
        max: 24
    }).custom((endHour, {req}) => {
        if (req.body.startHour >= req.body.endHour) {
            throw new BadRequestError('Година закінчення роботи повинна бути більша за початок');
        }
        return true;
    }).notEmpty(),
    body("phone", "Невірний формат телефону").isLength({min: 10}).isMobilePhone("any").notEmpty(),
    body("address", "Адреса хабу має бути коротше 2 символів").isLength({min: 2}).notEmpty(),
    body("photoUrl").optional()
]

export const updateHubStatusValidator = [
    body("status", "Статус повинен бути:").isIn(["Empty", "Busy"])
]