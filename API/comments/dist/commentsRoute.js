"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var commentsControl_1 = require("./commentsControl");
router
    .get("/get-comments", commentsControl_1.getComments)
    .post("/create-comment", commentsControl_1.createComment)
    .patch("/edit-comment", commentsControl_1.editComment)["delete"]("/delete-comment", commentsControl_1.deleteComment);
exports["default"] = router;
