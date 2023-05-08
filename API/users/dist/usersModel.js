"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: { require: true, type: String },
    password: { require: true, type: String },
    email: { require: true, type: String },
    birthday: { require: true, type: Date }
});
var UserModel = mongoose_1["default"].model("users", exports.UserSchema);
exports["default"] = UserModel;
