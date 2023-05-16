"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var PostControl_1 = require("./PostControl");
router
    .get("/get-posts", PostControl_1.getPosts)
    .post("/create-post", PostControl_1.createPost)
    .patch("/edit-post", PostControl_1.editPost)
    .get("/get-posts-of-user", PostControl_1.getPostsOfUser)
    .patch("/update-post", PostControl_1.updatePost)["delete"]("/delete-post", PostControl_1.deletePost);
exports["default"] = router;
