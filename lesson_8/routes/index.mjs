import { Router } from "express";
import MainController from "../controllers/mainController.mjs";

const router = new Router();

router.get("/", MainController.info);

export default router;
