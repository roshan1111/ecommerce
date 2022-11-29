import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minLength: [3, "name must be of 3 character "],
    maxLength: [300, "name must bot be of 300 character "],
    unique: true,

    lowercase: true,
  },
  slug: {
    type: String,

    unique: true,

    lowercase: true,
  },
});

//model name is registered user in db=  model("Users")
const Category = mongoose.model("Category", categorySchema);
export default Category;
