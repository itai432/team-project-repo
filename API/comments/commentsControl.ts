import CommentsModel from "./commentsModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const createComment = async (req: any, res: any) => {
    try {
      const { postId, content, currentDate } = req.body;
      const { user } = req.cookies;
      if (!secret) throw new Error("No secret");
  
      const decoded = jwt.decode(user, secret);
      const userId = decoded.userId;
  
      const commentDB = await CommentsModel.create({ user: userId, post: postId, content, currentDate });
      res.send({ comment: commentDB });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  };

export const deleteComment = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    const deleteComment = await CommentsModel.deleteOne({ _id });
    const comments = await CommentsModel.find({});

    res.send({ ok: true, comments });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "Cannot find or delete comment" });
  }
};

export const editComment = async (req: any, res: any) => {
  try {
    const { commentId, content } = req.body;

    const commentDB = await CommentsModel.findOneAndUpdate(
      { _id: commentId },
      { content },
      { new: true }
    );
    if (!commentDB) throw new Error("Could not find comment");
    
    res.send({ comment: commentDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getComments = async (req: any, res: any) => {
  try {
    const { postId } = req.query;
    const comments = await CommentsModel.find({post:postId});
    res.send({ comments });
  } catch (error: any) {
    res.status(500).send(error);
  }
};

