"use strict";
exports.__esModule = true;
exports.UserSchema = exports.UserType = void 0;
var mongoose_1 = require("mongoose");
var UserType;
(function (UserType) {
    UserType["PUBLIC"] = "public";
    UserType["ADMIN"] = "admin";
})(UserType = exports.UserType || (exports.UserType = {}));
exports.UserSchema = new mongoose_1.Schema({
    username: { require: true, type: String },
    password: { require: true, type: String },
    email: { require: true, type: String },
    birthday: { require: true, type: Date },
    userType: {
        type: String,
        "enum": UserType,
        "default": UserType.PUBLIC
    }
});
var UserModel = mongoose_1["default"].model("users", exports.UserSchema);
exports["default"] = UserModel;
