const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: [true, "User is required"],
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = { Auth };
