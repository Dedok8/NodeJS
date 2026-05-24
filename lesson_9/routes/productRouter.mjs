import { Router } from "express";
import ProductController from "../controllers/ProductController.mjs";
import ProductValidator from "../validation/Products/ProductValidationSchema.mjs";
import { ensureAuthenticated } from "../middleware/auth.mjs";

const router = new Router();

router.get("/", ensureAuthenticated, ProductController.renderProductList);
router.get("/create", ensureAuthenticated, ProductController.addProductForm);

router.post(
  "/create",
  ensureAuthenticated,
  ProductValidator.validate,
  ProductController.addProduct
);

export default router;
