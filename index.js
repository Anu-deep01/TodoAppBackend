const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { connectMongoDb } = require("./connection");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const app = express();
const PORT = 3000;
const dbURL = "todo-db";

// MongoDB Connection...
connectMongoDb(`mongodb://127.0.0.1:27017/${dbURL}`)
  .then(() => {
    console.log("MongoDB conected!");
  })
  .catch((error) => console.log("MongoDB connection error:", error));

// Middleware Plugin...
app.use(cors());

// Parse application/json payloads
app.use(express.json());

// Manage session for authantication
app.use(
  session({
    cookie: { secure: false, maxAge: 7200000 },
    resave: false,
    secret: "authkey",
    saveUninitialized: false,
  })
);

// Parse application/x-www-form-urlencoded from data
app.use(express.urlencoded({ urlencoded: false }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
