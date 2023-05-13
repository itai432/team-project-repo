import express from "express";
const router = express.Router();

import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "./commentsControl";

router
  .get("/get-comments", getComments)
  .post("/create-comment", createComment)
  .patch("/edit-comment", editComment)
  .delete("/delete-comment", deleteComment);

export default router;