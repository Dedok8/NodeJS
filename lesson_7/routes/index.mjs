import { Router } from "express";
import path from "path";

const router = Router();

router.get("/", (_req, res) => {
  res.sendFile(path.resolve("public/pages/home.html"));
});

router.get("/about", (_req, res) => {
  res.sendFile(path.resolve("public/pages/about.html"));
});

export default router;
