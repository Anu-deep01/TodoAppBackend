const mongoose = require("mongoose");
const { updateUpdatedAt } = require("../middlewares");

const todoSchema = new mongoose.Schema({
  todoId: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  userId: {
    type: Number,
    ref: "Auth",
    required: true,
  },
});

todoSchema.pre("save", updateUpdatedAt);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
