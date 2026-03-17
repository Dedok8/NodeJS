import { Router } from "express";

const router = new Router();

router.get("/", (_req, res) => {
  res.render("index", { title: "Головна сторінка" });
});

router.get("/coffee", (_req, res) => {
  res.render("task_2/coffee", { title: "Сторінка Кава" });
});

router.get("/music", (_req, res) => {
  res.render("task_2/music", { title: "Сторінка Музика" });
});

export default router;
