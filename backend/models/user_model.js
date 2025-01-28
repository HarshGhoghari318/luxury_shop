import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: [],
    },
  ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: [],
    },
  ],
  sex:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  mobileNo:{
    type: String,
    required: true
  }
});

const model = mongoose.model("users", userSchema);
export default model;
