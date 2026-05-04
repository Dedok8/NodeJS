import z from "zod";

export const CarValidationSchema = z.object({
  brand: z
    .string({ required_error: "Назва автомобіля не може бути порожньою" })
    .min(2, "Назва авто не може бути менше 2 літер")
    .trim(),

  year: z
    .string({ required_error: "Рік автомобіля не може бути порожнім" })
    .transform((val) => Number(val))
    .pipe(
      z
        .number({ invalid_type_error: "Вкажіть коректний рік" })
        .min(1886, "Рік не може бути менше 1886")
        .max(
          new Date().getFullYear(),
          `Рік не може бути більше ${new Date().getFullYear()}`
        )
    ),

  plateNumber: z
    .string({ required_error: "Номер автомобіля не може бути порожнім" })
    .min(2, "Номер авто не може бути менше 2 символів")
    .regex(/^[\p{L}\p{N}]+$/u, "Номер може містити лише літери та цифри")
    .trim(),
  type: z.string().optional(),
});
