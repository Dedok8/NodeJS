import mongoose, { Schema } from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Назва автомобіля не може бути порожньою"],
      minlength: [2, "Назва авто не може бути менше 2 літер"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Рік автомобіля не може бути порожнім"],
      min: [1886, "Рік не може бути менше 1886"],
      max: [
        new Date().getFullYear(),
        `Рік не може бути більше ${new Date().getFullYear()}`,
      ],
    },
    plateNumber: {
      type: String,
      required: [true, "Номер автомобіля не може бути порожнім"],
      minlength: [2, "Номер авто не може бути менше 2 символів"],
      trim: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
