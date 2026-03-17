import { Router } from "express";
import { products } from "../../utils/productData.mjs";

const router = new Router();

router.get("/", (_req, res) => {
  res.render("index", { title: "Інтернет-магазин" });
});

router.get("/addproduct", (_req, res) => {
  res.render("task_4/addProduct", { title: "Додати продукт" });
});

router.get("/products", (_req, res) => {
  res.render("task_4/products", { title: "Список продуктів", products });
});

export default router;
