import express from "express";
import connectDB from "./db/db.mjs";
import middleware from "./middleware/index.mjs";
import router from "./routes/index.mjs";
import { errorHandler } from "./middleware/errorHandler.mjs";

const app = express();

connectDB();

middleware(app);

router(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
