export function userValidationMiddleware(validationSchema) {
  return (req, res, next) => {
    const result = validationSchema.safeParse(req.body)

    if (!result.success) {
      return res.render('register', {
        data: req.body,
        errors: result.error.issues.map((err) => err.message),
      })
    }

    req.validatedUserData = result.data
    next()
  }
}
