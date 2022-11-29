import mongoose, { Schema } from "mongoose";
  const productSchema = new mongoose.Schema({


  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minLength: [3, "name must be of 3 character "],
    maxLength: [150, "name must bot be of 300 character "],
    lowercase: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
    minLength: [3, "name must be of 3 character "],
    maxLength: [500, "name must bot be of 300 character "],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
    trim: true,
  },
  sold: {
    type: Number,
    trim: true,
    default: 0,
  },
  shipping: {
    type: Boolean,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;


