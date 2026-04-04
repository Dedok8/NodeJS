import { body } from "express-validator";

class CarValidator {
  static carValidationRules = [
    body("brand")
      .notEmpty()
      .withMessage("Марка авто не може бути порожньою")
      .isLength({ min: 2 })
      .withMessage("Марка повинна містити мінімум 2 символи")
      .trim()
      .escape(),

    body("year")
      .notEmpty()
      .withMessage("Рік обов'язковий")
      .isInt({ min: 1886, max: new Date().getFullYear() })
      .withMessage("Некоректний рік випуску")
      .toInt(),

    body("plate")
      .notEmpty()
      .withMessage("Номер авто обов'язковий")
      .isLength({ min: 6, max: 10 })
      .withMessage("Номер повинен містити 6–10 символів")
      .trim()
      .escape(),
  ];
}

export default CarValidator;
