const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true, trim: true },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      maxLength: 400,
      default: "نبذة مختصرة عنك",
    },
    profile: {
      type: String,
      default: "uploads/images/profiles/userprofile.png",
    },
    password: { type: String, require: true },
    favourites: { type: Array, required: false },
    visited: { type: Array, required: false },
    role: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
