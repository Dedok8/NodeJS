import express from "express";
import CarController from "../controllers/carController.mjs";
import { carValidationMiddleware } from "../middlewares/validationMiddleware.mjs";
import { CarValidationSchema } from "../validation/carSchema.mjs";

const router = express.Router();

router.get("/", CarController.carList);
router.get("/add", CarController.addForm);
router.get("/add/:id", CarController.addForm);

router.post(
  "/add",
  carValidationMiddleware(CarValidationSchema),
  CarController.addCar
);
router.post(
  "/add/:id",
  carValidationMiddleware(CarValidationSchema),
  CarController.addCar
);

router.delete("/", CarController.deleteCar);

export default router;
