import express from "express";
const app = express();
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
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


app.listen(3000, () => {
    console.log("server listen on port 3000");
  });