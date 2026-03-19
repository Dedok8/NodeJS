import { Router } from "express";

const router = Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Book manager" });
});

export default router;
