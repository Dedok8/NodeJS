import { Router } from "express";
import ProductController from "../controllers/ProductController.mjs";
import ProductValidator from "../validation/Products/ProductValidationSchema.mjs";

const router = new Router();

router.get("/", ProductController.renderProductList);
router.get("/create", ProductController.addProductForm);

router.post("/create", ProductValidator.validate, ProductController.addProduct);

export default router;
