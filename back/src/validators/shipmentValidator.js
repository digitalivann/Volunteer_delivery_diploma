import {body, param} from "express-validator";

export const addShipmentValidator = [
    body('notes').optional(),
    body('destination').optional(),
    body("hubstop.id", "Нечисельне айді зупинки у хабі на маршруті").isNumeric().toInt().notEmpty(),
    body("goods", "Немає позицій у посилці").isArray({ min: 1 }),
    body("goods.*.name", "Назва позиції має бути не коротше 2 символів").isLength({min: 2}),
    body("goods.*.type", "Тип позиції повинен бути визначеним").isIn(["FOOD", "CLOTHES", "MEDICINE", "GADGETS", "OTHER", "MATERIALS"]),
    body("goods.*.needId", "Нечисельне айді потреби").optional({checkFalsy: true}).isNumeric().toInt()
]

export const shipmentIdValidator = [
    param("id").isNumeric().toInt().notEmpty(),
]