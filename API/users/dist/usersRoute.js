"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var usersControle_1 = require("./usersControle");
router
    .get("/get-users", usersControle_1.getUsers)
    .post("/create-user", usersControle_1.createUser)
    .patch("/update-user-name", usersControle_1.updateUserName)
    .post("/login", usersControle_1.login)
    .get("/get-user-by-id", usersControle_1.getUserById)["delete"]("/delete-user", usersControle_1.deleteUser);
exports["default"] = router;
