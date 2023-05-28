import express from "express";
import { getUsers,getUser, createUser, login, deleteUser, getUserById, updateUserName, logout } from "./usersControle";
import { isAdmin } from "./usersMiddleware";
import path from "path";

const router = express.Router();

router
  .get("/admin", isAdmin)
  .get("/get-users", getUsers)
  .post("/create-user", createUser)
  .patch("/update-user-name", updateUserName)
  .post("/login", login)
  .get("/getUser",getUser)
  .get("/logout", logout)
  .get("/get-user-by-id", getUserById)
  .delete("/delete-user", deleteUser);

export default router;