const { Auth } = require("../models/auth");
const session = require("express-session");

async function handleGetAllUsers(req, res) {
  try {
    const allUsers = await Auth.find({});

    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);

    return res
      .status(500)
      .json({ message: "An error occurred while fetching users." });
  }
}

async function handleCreateUser(req, res) {
  const { userName, password } = req.body;

  try {
    const allUsers = await Auth.find({});

    const existingUser = await Auth.findOne({ userName });

    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists!" });
    }

    const newUser = await Auth.create({
      userId: allUsers.length + 1,
      userName,
      password,
    });

    req.session.user = newUser;

    return res.status(200).send({
      success: true,
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .send({ message: "An error occurred while creating the user." });
  }
}

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return res.status(200).json({
      user: req.session.user,
      message: "User logged in successfully!",
      success: true,
    });
  }
  return res
    .status(200)
    .json({ success: false, user: null, message: "Not authenticated" });
};

async function handleUserLogin(req, res) {
  const { userName, password } = req.body;

  try {
    if (!userName || !password) {
      return res.status(200).json({
        success: false,
        message: "Username and password are required!",
      });
    }

    const user = await Auth.findOne({ userName, password });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid username or password!" });
    }

    req.session.user = user;

    return res.status(200).json({
      user: user,
      message: "User logged in successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      message: "An error occurred during login. Please try again later.",
    });
  }
}

async function handleDeleteUserById(req, res) {
  const { id } = req.params;

  try {
    const deletedUser = await Auth.findByIdAndDelete({ userId: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);

    return res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
}

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleUserLogin,
  isAuthenticated,
  handleDeleteUserById,
};
