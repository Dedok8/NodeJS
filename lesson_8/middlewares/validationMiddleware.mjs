import * as carTypeService from "../services/CarTypeService.mjs";

export function carValidationMiddleware(validationSchema) {
  return async (req, res, next) => {
    const result = validationSchema.safeParse(req.body);

    if (!result.success) {
      const typesList = await carTypeService.getAllTypes();
      return res.render("addForm", {
        data: req.body,
        typesList,
        errors: result.error.issues.map((err) => err.message),
      });
    }

    req.validatedData = result.data;
    next();
  };
}
