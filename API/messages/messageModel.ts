import mongoose, { Schema } from "mongoose";
import { UserSchema } from "../users/usersModel";

interface Message {
  user: {
    type: Schema.Types.ObjectId;
    ref: "users";
    required: true;
  };
  content: string;
  timestamp: Date;
}

const MessageSchema = new Schema<Message>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model<Message>("messages", MessageSchema);
export default MessageModel;