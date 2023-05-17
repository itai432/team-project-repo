import express from "express";
const router = express.Router();

import { getUsers, createUser, login, deleteUser, getUserById,updateUserName } from "./usersControle";

import { isAdmin } from "./usersMiddleware";
router
  .get("/get-users", getUsers)
  .post("/create-user", createUser)
  .patch("/update-user-name",updateUserName)
  .post("/login",isAdmin,login)
  .get("/get-user-by-id",getUserById)
  .delete("/delete-user",isAdmin, deleteUser);

  export default router
