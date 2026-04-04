import { Router } from "express";
import CarController from "../controllers/CarController.mjs";
import uploadMiddleWare from "../middleware/uploadMiddleware.mjs";
import CarValidator from "../models/CarValidator.mjs";

const router = new Router();

router.get("/", CarController.getAllCars);
router.get("/add", CarController.getForm);
router.get("/edit/:id", CarController.getForm);
router.get("/:id", CarController.getCarById);

router.post("/delete/:id", CarController.deleteCarById);

router.post(
  "/",
  uploadMiddleWare.single("image"),
  CarValidator.carValidationRules,
  CarController.createCar
);
router.post(
  "/:id",
  uploadMiddleWare.single("image"),
  CarValidator.carValidationRules,
  CarController.updateCar
);

export default router;
