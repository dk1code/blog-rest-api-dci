const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, minlength: 5, required: true },
    text: { type: String, minlength: 20, required: true },
    date: { type: Date, default: Date.now },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
