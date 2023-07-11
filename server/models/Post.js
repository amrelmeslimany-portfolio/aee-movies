const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
    },
    cover: {
      type: String,
    },
    likes: {
      size: { type: Number, default: 0 },
      ids: {
        type: Map,
        of: Boolean,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
