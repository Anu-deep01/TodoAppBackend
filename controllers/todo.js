const moment = require("moment");
const Todo = require("../models/todo");

async function handleGetAllTodos(req, res) {
  try {
    const todos = await Todo.find({});

    if (!todos || todos.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No todos found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching todos",
      error: error.message,
    });
  }
}

async function handleCreateNewTodo(req, res) {
  try {
    const { title, description, userId } = req.body;

    const todos = await Todo.find({});

    if (!title || !description) {
      return res.status(200).json({
        success: false,
        message: "All fields (title, description, dueDate) are required!",
      });
    }

    const existingTodo = await Todo.findOne({ title });

    if (existingTodo) {
      return res
        .status(200)
        .send({ success: false, message: "Todo already exists!" });
    }

    const todo = await Todo.create({
      todoId: todos.length + 1,
      title: title,
      description: description,
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Todo created successfully!",
      data: todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the todo.",
      error: error.message,
    });
  }
}

async function handleGetTodoById(req, res) {
  try {
    const userId = req.params.userId;
    const todos = await Todo.find({ userId });

    if (!todos || todos.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: `No todos found for user with userId ${userId}`,
      });
    }

    const todosList = todos.map((todo) => ({
      ...todo.toObject(),
      createdAt: moment(todo.createdAt).format("MMMM Do YYYY, h:mm a"),
    }));

    return res.status(200).json({
      success: true,
      message: "Todos retrieved successfully!",
      data: todosList,
    });
  } catch (error) {
    console.error("Error retrieving todos:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the todos.",
      error: error.message,
    });
  }
}

async function handleUpdateTodoById(req, res) {
  try {
    const { todoId, isCompleted, title, description } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      { todoId },
      { isCompleted, title, description, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(200).json({
        success: false,
        message: `Todo with todoId ${todoId} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully!",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the todo.",
      error: error.message,
    });
  }
}

async function handleDeleteTodoById(req, res) {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findOneAndDelete({ todoId: todoId });

    if (!todo) {
      return res
        .status(200)
        .json({ success: false, message: "Todo not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully!" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res
      .status(500)
      .json({ message: "Server error, failed to delete todo" });
  }
}

module.exports = {
  handleGetAllTodos,
  handleCreateNewTodo,
  handleGetTodoById,
  handleUpdateTodoById,
  handleDeleteTodoById,
};
