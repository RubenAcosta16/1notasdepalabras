import { Schema, model, models } from "mongoose";

const TypeSchema = new Schema(
  {
    id: {
      type: String,
      // required: [true, "The Username is required "],
      unique: true,
      //cosa que quita espacios de mas
      trim: true,
      // maxlength: [40, "title cannot be grater than 40 characters"],
    },
    name: {
      type: String,
    //   required: [true, "The Username is required "],
      unique: true,
      //cosa que quita espacios de mas
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    userId: {
      type: String,
    //   required: [true, "The Email is required "],
      trim: true,
    //   maxlength: [200, "title cannot be grater than 200 characters"],
    },
    img: {
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    //   maxlength: [200, "title cannot be grater than 200 characters"],
    },
    description:{
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    },
    hasGroup:{
      type: Boolean,
      // required: [true, "The Password is required "],
      // trim: true,
    },
    hasImg:{
      type: Boolean,
      // required: [true, "The Password is required "],
      // trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//si existe el modelo usalo, sino lo creas
export default models.Type || model("Type", TypeSchema);