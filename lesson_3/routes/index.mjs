import { Router } from "express";
import taskOneRouter from "./task_1/task_1.mjs";
import taskTwoRouter from "./task_2/task_2.mjs";
import taskThreeRouter from "./task_3/task_3.mjs";
import taskFourRouter from "./task_4/task_4.mjs";

const router = new Router();

router.use("/", taskOneRouter);
router.use("/", taskTwoRouter);
router.use("/", taskThreeRouter);
router.use("/", taskFourRouter);

export default router;
