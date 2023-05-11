"use strict";
exports.__esModule = true;
exports.PostsModel = exports.PostSchema = void 0;
var mongoose_1 = require("mongoose");
exports.PostSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    header: String,
    content: String,
    date: String
});
exports.PostsModel = mongoose_1["default"].model("posts", exports.PostSchema);
exports["default"] = exports.PostsModel;
