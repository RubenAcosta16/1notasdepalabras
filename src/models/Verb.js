import { Schema, model, models } from "mongoose";

const VerbSchema = new Schema(
  {
    id: {
      type: String,
      // required: [true, "The Username is required "],
      // unique: true,
      //cosa que quita espacios de mas
      trim: true,
      // maxlength: [40, "title cannot be grater than 40 characters"],
    },
    // lo cambie de "name" a esto porque da error al repetir
    name: {
      type: String,
      //   required: [true, "The Username is required "],
      // unique: true,
      //cosa que quita espacios de mas
      trim: true,
      // maxlength: [40, "title cannot be grater than 40 characters"],
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
    description: {
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    },
    type: {
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    },
    group: {
      type: String,
      // required: [true, "The Password is required "],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//si existe el modelo usalo, sino lo creas
export default models.Verb || model("Verb", VerbSchema);
