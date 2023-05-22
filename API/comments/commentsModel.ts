import mongoose, { Schema } from "mongoose";
import { UserSchema } from "../users/usersModel";
import { PostSchema } from "../posts/postsModel";

interface Comment {
  user: {
    type: Schema.Types.ObjectId;
    ref: "users";
    required: true;
  };
  post: {
    type: Schema.Types.ObjectId;
    ref: "posts";
    required: true;
  };
  content: string;
  currentDate: Date;
}

const CommentSchema = new Schema<Comment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  content: String,
  currentDate: String,
});

const CommentsModel = mongoose.model<Comment>("comments", CommentSchema);
export default CommentsModel;
