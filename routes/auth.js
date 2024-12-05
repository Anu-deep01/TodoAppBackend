const express = require("express");
const {
  handleCreateUser,
  handleUserLogin,
  handleGetAllUsers,
  handleDeleteUserById,
  isAuthenticated,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", handleCreateUser).post("/login", handleUserLogin);

router.get("/protected", isAuthenticated);

router.route("/").get(handleGetAllUsers);
router.route("/:id").delete(handleDeleteUserById);

module.exports = router;
