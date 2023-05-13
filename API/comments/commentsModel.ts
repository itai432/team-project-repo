import mongoose, {Schema} from "mongoose";
import { UserSchema } from "../users/usersModel";
import { PostSchema } from "../posts/postsModel";

interface Comment {
    user:{
        type: Schema.Types.ObjectId;
        ref:"users";
        required: true;
    };
    post:{
        type: Schema.Types.ObjectId;
        ref:"posts";
        required: true;
    };
    content: string;
    date: Date;
}

const CommentSchema = new Schema <Comment>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      post:{
        type: Schema.Types.ObjectId,
        ref:"posts",
        required:true,
      },
      content: String,
      date: Date,
});

const CommentsModel = mongoose.model<Comment>("comments", CommentSchema);
export default CommentsModel;