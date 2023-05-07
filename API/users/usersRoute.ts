import express from "express";
const router = express.Router();

import { getUsers, createUser, login, deleteUser } from "./usersControle";

router
  .get("/get-users", getUsers)
  .post("/create-user", createUser)
  .post("/login", login)
  .delete("/delete-user", deleteUser);

  export default router
