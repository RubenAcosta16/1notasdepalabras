import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The Task title is required "],
      unique: true,
      //cosa que quita espacios
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "title cannot be grater than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//si existe el modelo usalo, sino lo creas
export default models.Task || model("Task", TaskSchema);