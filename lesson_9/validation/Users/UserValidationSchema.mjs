import z from "zod";

class UserValidator {
  static userSchema = z.object({
    name: z
      .string({ required_error: "Ім'я не може бути порожнім" })
      .min(2, "Ім'я не може бути менше 2 символів")
      .trim(),

    password: z
      .string({ required_error: "Пароль не може бути порожнім" })
      .min(6, "Пароль не може бути менше 6 символів"),
  });

  static validate(req, res, next) {
    const result = UserValidator.userSchema.safeParse(req.body);

    if (!result.success) {
      req.validationErrors = result.error.issues.map((err) => err.message);
    } else {
      req.body = result.data;
    }
    next();
  }
}

export default UserValidator;
