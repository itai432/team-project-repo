import express from "express";
import mongoose, {Schema} from "mongoose";
import { UserSchema } from "../users/usersModel";

interface Post {
    header:string,
    content:string,
    date: Date,
}


export const PostSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
    header: String,
    content: String,
    date: String,
  });

export const PostsModel = mongoose.model("posts",PostSchema);
export default PostsModel