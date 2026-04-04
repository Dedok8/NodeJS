import { Router } from "express";
import CarController from "../controllers/CarController.mjs";
import uploadMiddleWare from "../middleware/uploadMiddleware.mjs";
import { CarValidationMiddleware } from "../middleware/carValidationMIddleware.mjs";
import { CarValidationSchema } from "../models/CarValidation.mjs";

const router = new Router();

router.get("/", CarController.getAllCars);
router.get("/add", CarController.getForm);
router.get("/edit/:id", CarController.getForm);
router.get("/:id", CarController.getCarById);

router.post("/delete/:id", CarController.deleteCarById);
router.post(
  "/",
  uploadMiddleWare.single("image"),
  CarValidationMiddleware(CarValidationSchema),
  CarController.createCar
);
router.post(
  "/:id",
  uploadMiddleWare.single("image"),
  CarValidationMiddleware(CarValidationSchema),
  CarController.updateCar
);

export default router;
