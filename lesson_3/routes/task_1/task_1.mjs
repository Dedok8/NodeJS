import { Router } from "express";
import { getSeason, getDay, getTime } from "../../utils/dataTask_1.mjs";

const router = new Router();

router.get("/season", (_req, res) => {
  res.render("task_1/task_1", {
    title: "Пора року",
    data: getSeason(),
  });
});

router.get("/day", (_req, res) => {
  res.render("task_1/task_1", {
    title: "День тижня",
    data: getDay(),
  });
});

router.get("/time", (_req, res) => {
  res.render("task_1/task_1", {
    title: "Час дня",
    data: getTime(),
  });
});

export default router;
