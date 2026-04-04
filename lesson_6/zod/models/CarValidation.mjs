import z from "zod";

export const CarValidationSchema = z.object({
  brand: z
    .string()
    .nonempty({ message: "Назва автомобіля не повинна бути порожньою" })
    .min(2, { message: "Назва автомобіля повинна бути не менше 2 літер" }),

  year: z
    .string()
    .nonempty({ message: "Рік обов'язковий" })
    .transform((val) => Number(val))
    .pipe(
      z
        .number({ invalid_type_error: "Вкажіть коректний рік" })
        .gte(1900, { message: "Рік має бути не менше 1886" })
        .lte(new Date().getFullYear(), {
          message: `Рік має бути не більше ${new Date().getFullYear()}`,
        })
    ),

  plate: z
    .string()
    .min(1, { message: "Вкажіть номер авто" })
    .regex(/^[\p{L}\p{N}]+$/u, {
      message: "Номер може містити лише літери та цифри",
    }),
});
