"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    content: String,
    date: Date
});
var CommentsModel = mongoose_1["default"].model("comments", CommentSchema);
exports["default"] = CommentsModel;
