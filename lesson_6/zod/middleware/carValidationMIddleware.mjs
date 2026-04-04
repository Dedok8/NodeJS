import Car from "../models/CarModel.mjs";

export function CarValidationMiddleware(validationSchema) {
  return (req, res, next) => {
    const result = validationSchema.safeParse(req.body);

    if (!result.success) {
      const carId = req.params.id;

      return res.render("cars/carForm", {
        car: carId ? Car.loadCarById(carId) : null,
        data: req.body,
        errors: result.error.issues.map((err) => err.message),
      });
    }

    req.validatedData = result.data;
    next();
  };
}
