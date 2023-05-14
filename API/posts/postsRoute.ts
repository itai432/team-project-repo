import express from "express";
const router = express.Router();

import { createPost , deletePost , editPost, getPosts, getPostsOfUser } from "./PostControl";

router
  .get("/get-posts",getPosts)
  .post("/create-post",createPost)
  .patch("/edit-post",editPost)
  .get("/get-posts-of-user", getPostsOfUser)
  .delete("/delete-post",deletePost);

  export default router