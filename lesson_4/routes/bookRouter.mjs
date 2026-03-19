import { Router } from "express";
import BookController from "../contollers/bookController.mjs";

const router = new Router();

router.get("/", BookController.getAllBook);
router.get("/create", BookController.getForm);
router.get("/edit/:id", BookController.getForm);
router.get("/:id", BookController.getById);

router.post("/", BookController.create);
router.post("/:id", BookController.update);

router.delete("/delete/:id", BookController.deleteById);

export default router;
