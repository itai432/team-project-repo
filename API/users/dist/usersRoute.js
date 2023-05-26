"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usersControle_1 = require("./usersControle");
var usersMiddleware_1 = require("./usersMiddleware");
var path_1 = require("path");
var router = express_1["default"].Router();
router
    .get("/admin", usersMiddleware_1.isAdmin, function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, "admin", "index.html"));
})
    .get("/get-users", usersControle_1.getUsers)
    .post("/create-user", usersControle_1.createUser)
    .patch("/update-user-name", usersControle_1.updateUserName)
    .post("/login", usersControle_1.login)
    .get("/logout", usersControle_1.logout)
    .get("/get-user-by-id", usersControle_1.getUserById)["delete"]("/delete-user", usersControle_1.deleteUser);
exports["default"] = router;
