import { Router } from "express";
import CarController from "../controllers/carController.mjs";
import uploadMiddleWare from "../middleware/uploadMiddleware.mjs";

const router = new Router();

router.get("/", CarController.getAllCars);
router.get("/add", CarController.getForm);
router.get("/edit/:id", CarController.getForm);
router.get("/:id", CarController.getCarById);

router.post("/", uploadMiddleWare.single("image"), CarController.createCar);
router.post("/:id", uploadMiddleWare.single("image"), CarController.updateCar);

router.post("/delete/:id", CarController.deleteCarById);

export default router;
