"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    content: String,
    timestamp: {
        type: Date,
        "default": Date.now
    }
});
var MessageModel = mongoose_1["default"].model("messages", MessageSchema);
exports["default"] = MessageModel;
