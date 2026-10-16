const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      minlength: [10, "Body must be at least 10 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      set: (arr) =>
        arr.map((t) => String(t).trim().toLowerCase()).filter(Boolean),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);