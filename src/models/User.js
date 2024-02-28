import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      // required: [true, "The Username is required "],
      // unique: true,
      //cosa que quita espacios de mas
      trim: true,
      // maxlength: [40, "title cannot be grater than 40 characters"],
    },
    username: {
      type: String,
      required: [true, "The Username is required "],
      unique: true,
      //cosa que quita espacios de mas
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    email: {
      type: String,
      required: [true, "The Email is required "],
      trim: true,
    //   maxlength: [200, "title cannot be grater than 200 characters"],
    },
    password: {
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    //   maxlength: [200, "title cannot be grater than 200 characters"],
    },
    provider:{
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    },
    aaa:{
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    },
    image:{
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//si existe el modelo usalo, sino lo creas
export default models.User || model("User", UserSchema);