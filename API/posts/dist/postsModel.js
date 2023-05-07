"use strict";
exports.__esModule = true;
exports.PostsModel = exports.PostSchema = void 0;
var mongoose_1 = require("mongoose");
var usersModel_1 = require("../users/usersModel");
exports.PostSchema = new mongoose_1.Schema({
    username: usersModel_1.UserSchema,
    header: String,
    content: String,
    date: Date
});
exports.PostsModel = mongoose_1["default"].model("posts", exports.PostSchema);
exports["default"] = exports.PostsModel;
