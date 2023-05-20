import express from "express";
import http from "http";
// import * as socketio from "socket.io";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

const server = http.createServer(app);

// const io = new socketio.Server(server);

dotenv.config();

app.use(cookieParser());

const uri: string | undefined = process.env.MONGODB_URI;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => console.log(err));
} else {
  console.log("No URI to DB");
}

app.use(express.json());

app.use(express.static("./client"));

import usersRouter from "./API/users/usersRoute";
app.use("/api/users", usersRouter);

import postsRoute from "./API/posts/postsRoute";
app.use("/api/posts", postsRoute);

import commentsRoute from "./API/comments/commentsRoute";
app.use("/api/comments", commentsRoute);

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

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
