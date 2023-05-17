"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var postControl_1 = require("./postControl");
router
    .get("/get-posts", postControl_1.getPosts)
    .post("/create-post", postControl_1.createPost)
    .patch("/edit-post", postControl_1.editPost)
    .get("/get-posts-of-user", postControl_1.getPostsOfUser)
    .patch("/update-post", postControl_1.updatePost)["delete"]("/delete-post", postControl_1.deletePost);
exports["default"] = router;
