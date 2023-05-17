import express from "express";
const router = express.Router();

import { createPost , deletePost , editPost, getPosts, getPostsOfUser, updatePost } from "./postControl";

router
  .get("/get-posts",getPosts)
  .post("/create-post",createPost)
  .patch("/edit-post",editPost)
  .get("/get-posts-of-user", getPostsOfUser)
  .patch("/update-post",updatePost)
  .delete("/delete-post",deletePost);

  export default router