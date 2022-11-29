import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minLength: [3, "name must be of 3 character "],
    maxLength: [300, "name must bot be of 300 character "],

    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    minLength: [3, "product must be of 3 character "],
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
    required: [true, "isAdmin is required"], // 0 is user 1 is admin
  },
  isVerify: {
    type: Number,
    default: 0, // 0 is not verified which is default and email is sent and when they click it will be 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//model name is registered user in db=  model("Users")
const User = mongoose.model("Users", userSchema);
export default User;
