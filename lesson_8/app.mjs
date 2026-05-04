import config from "./config/default.mjs";
import { errorHandler } from "./middlewares/errorHandler.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import indexRouter from "./routes/index.mjs";
import carRoutes from "./routes/carRoutes.mjs";
import connectDB from "./db/db.mjs";

const app = express();

// Підключення до MongoDB
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/cars", carRoutes);
app.use("/", indexRouter);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Глобальний error handler
app.use(errorHandler);

const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
