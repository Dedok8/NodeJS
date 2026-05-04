import mongoose from "mongoose";

const carType = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Тип обов"язковий'],
    minlength: [4, "Довжина тиму має бути принаймні 4 символи!"],
    trim: true,
  },
});

export default mongoose.model("Type", carType);
