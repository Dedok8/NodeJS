import { Router } from "express";
import UserController from "../controllers/UserController.mjs";
import UserValidator from "../validation/Users/UserValidationSchema.mjs";

const router = Router();

router.get("/users", UserController.renderUserList);

router.get("/login", UserController.renderLoginForm);
router.post("/login", UserValidator.validate, UserController.login);

router.get("/register", UserController.renderRegisterForm);
router.post("/register", UserValidator.validate, UserController.register);

export default router;
