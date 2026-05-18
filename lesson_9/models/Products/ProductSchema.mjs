import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
    max: 10_000_000,
  },
  count: {
    type: Number,
    required: true,
    min: 0,
    max: 1_000_000,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
