import express from "express";
import { getUsers, createUser, login, deleteUser, getUserById, updateUserName, logout } from "./usersControle";
import { isAdmin } from "./usersMiddleware";
import path from "path";

const router = express.Router();

router
  .get("/admin", isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, "admin", "index.html"));
  })
  .get("/get-users", getUsers)
  .post("/create-user", createUser)
  .patch("/update-user-name", updateUserName)
  .post("/login", login)
  .get("/logout", logout)
  .get("/get-user-by-id", getUserById)
  .delete("/delete-user", deleteUser);

export default router;