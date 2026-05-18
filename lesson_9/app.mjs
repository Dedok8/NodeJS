import express from "express";
import expressLayouts from "express-ejs-layouts";
import config from "./config/default.mjs";
import { viewsDir, publicDir } from "./config/paths.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";
import indexRouter from "./routes/index.mjs";
import productRouter from "./routes/productRouter.mjs";
import userRouter from "./routes/userRouter.mjs";
import sessionConfig from "./config/session.mjs";

import connectDB from "./db/db.mjs";

const app = express();

connectDB();

app.use(sessionConfig);

// Парсери
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Шаблони і статика
app.set("view engine", "ejs");
app.set("views", viewsDir);
app.use(express.static(publicDir));

// Layouts
app.use(expressLayouts);
app.set("layout", "index");

// Роути
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/", userRouter);

// Error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
