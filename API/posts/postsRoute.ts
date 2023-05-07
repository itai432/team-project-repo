import express from "express";
const router = express.Router();

import { createPost , deletePost , editPost, getPosts } from "./PostControl";

router
  .get("/get-posts",getPosts)
  .post("/create-post",createPost)
  .patch("/edit-post",editPost)
  .delete("/delete-post",deletePost);

  export default router