import express from "express";
const router = express.Router();

import { getUsers, createUser, login, deleteUser, getUserById } from "./usersControle";

router
  .get("/get-users", getUsers)
  .post("/create-user", createUser)
  .post("/login", login)
  .get("/get-user-by-id",getUserById)
  .delete("/delete-user", deleteUser);

  export default router
