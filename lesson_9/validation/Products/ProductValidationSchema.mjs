import z from "zod";

class ProductValidator {
  static productSchema = z.object({
    name: z
      .string({ required_error: "Назва товару не може бути порожньою" })
      .min(2, "Назва товару не може бути менше 2х символів")
      .trim(),

    price: z
      .string({ required_error: "Ціна не може бути порожньою" })
      .trim()
      .refine((val) => val !== "", { message: "Ціна не може бути порожньою" })
      .transform((val) => Number(val))
      .pipe(
        z
          .number()
          .positive("Ціна повинна бути більше 0")
          .max(10_000_000, "Ціна занадто велика")
      ),

    count: z
      .string({ required_error: "Кількість товару не може бути порожньою" })
      .trim()
      .refine((val) => val !== "", {
        message: "Кількість не може бути порожньою",
      })
      .transform((val) => Number(val))
      .pipe(
        z
          .number()
          .int("Кількість повинна бути цілим числом")
          .min(0, "Кількість товару не може бути від'ємною")
          .max(1_000_000, "Кількість занадто велика")
      ),
  });

  static validate(req, res, next) {
    const result = ProductValidator.productSchema.safeParse(req.body);

    if (!result.success) {
      req.validationErrors = result.error.issues.map((err) => err.message);
    } else {
      req.body = result.data;
    }
    next();
  }
}

export default ProductValidator;
