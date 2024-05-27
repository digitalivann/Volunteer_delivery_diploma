import {body} from "express-validator";
export const signUpValidator = [
    body("email", "Невірний формат імейлу").isEmail().notEmpty(),
    body("role", "Роль повинна бути волонтером або водієм").isIn(["VOLUNTEER", 'DRIVER','ADMIN']).notEmpty(),
    body("password", "Пароль повинен бути латинецею, а також має складатися з мінімум 8 символів," +
        " 1 цифри та 1 великої літери").isLength({min: 8}).matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$').notEmpty(),
    body("name", "Ім'я має бути не менше 2 символів").isLength({min: 2}).notEmpty(),
    body("surname", "Прізвище має бути не менше 2 символів").isLength({min: 2}).notEmpty(),
    body("phone", "Невірний формат телефону").isLength({min: 10}).isMobilePhone("any").notEmpty(),
]

export const signInValidator = [
    body("email", "Невірний формат імейлу").isEmail().notEmpty(),
    body("password", "Пароль повинен бути латинецею, а також має складатися з мінімум 8 символів," +
        " 1 цифри та 1 великої літери").isLength({min: 8}).matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$').notEmpty(),
]

export const updateInfoValidator = [
    body("email", "Невірний формат імейлу").isEmail().notEmpty(),
    body("name", "Ім'я має бути не менше 2 символів").isLength({min: 2}).notEmpty(),
    body("surname", "Прізвище має бути не менше 2 символів").isLength({min: 2}).notEmpty(),
    body("phone", "Невірний формат телефону").isLength({min: 10}).isMobilePhone("any").notEmpty(),
]

export const changePasswordValidator = [
    body("password", "Пароль повинен бути латинецею, а також має складатися з мінімум 8 символів," +
        " 1 цифри та 1 великої літери").isLength({min: 8}).matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$').notEmpty(),
    body("newPassword", "Пароль повинен бути латинецею, а також має складатися з мінімум 8 символів," +
        " 1 цифри та 1 великої літери").isLength({min: 8}).matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$').notEmpty(),
]