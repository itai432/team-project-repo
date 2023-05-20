"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var messagesControl_1 = require("./messagesControl");
router
    .get("/get-messages", messagesControl_1.getMessages)
    .post("/create-message", messagesControl_1.createMessage)
    .patch("/edit-message", messagesControl_1.editMessage)["delete"]("/delete-message", messagesControl_1.deleteMessage);
exports["default"] = router;
