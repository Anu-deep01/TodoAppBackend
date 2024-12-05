const express = require("express");

const {
  handleGetAllTodos,
  handleCreateNewTodo,
  handleGetTodoById,
  handleUpdateTodoById,
  handleDeleteTodoById,
} = require("../controllers/todo");

const router = express.Router();

router
  .route("/")
  .get(handleGetAllTodos)
  .post(handleCreateNewTodo)
  .patch(handleUpdateTodoById);

router.route("/:userId").get(handleGetTodoById);

router.route("/:todoId").delete(handleDeleteTodoById);

module.exports = router;
