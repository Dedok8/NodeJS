import mongoose from "mongoose";
import { trim } from "zod";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Назва автомобіля не може бути порожньою"],
      minLength: [2, "Назва автомобіля повинна бути не менше 2 літер"],
      trim: true,
    },
    year: { type: String, required: [true, "Рік обов'язковий"], trim: true },
    plate: {
      type: String,
      required: [true, "Вкажіть номер авто"],
      minLength: [2, "Марка автомобіля повинна бути не менше 2 літер"],
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
