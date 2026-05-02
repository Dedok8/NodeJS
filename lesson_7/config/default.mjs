import mongoose from "mongoose";
import "dotenv/config";

export default Object.freeze({
  databaseName: process.env.DATABASE_NAME,
  databaseUrl: process.env.MONGO_URI,
  mongoURI: `${process.env.MONGO_URI}${process.env.DATABASE_NAME}`,
  port: process.env.PORT,
});
