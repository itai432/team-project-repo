"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http_1 = require("http");
// import * as socketio from "socket.io";
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var cookie_parser_1 = require("cookie-parser");
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
// const io = new socketio.Server(server);
dotenv.config();
app.use(cookie_parser_1["default"]());
var uri = process.env.MONGODB_URI;
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () {
        console.log("DB connected!");
    })["catch"](function (err) { return console.log(err); });
}
else {
    console.log("No URI to DB");
}
app.use(express_1["default"].json());
app.use(express_1["default"].static("./client"));
var usersRoute_1 = require("./API/users/usersRoute");
app.use("/api/users", usersRoute_1["default"]);
var postsRoute_1 = require("./API/posts/postsRoute");
app.use("/api/posts", postsRoute_1["default"]);
var commentsRoute_1 = require("./API/comments/commentsRoute");
app.use("/api/comments", commentsRoute_1["default"]);
// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
//   socket.on("sendMessage", (message) => {
//     console.log("Received new message:", message);
//     io.emit("newMessage", message);
//   });
// });
app.get("/", function (req, res) {
    res.redirect("http://localhost:3000/login/index.html");
});
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Server is listening on port " + port);
});
