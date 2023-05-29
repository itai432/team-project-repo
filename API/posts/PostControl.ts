import PostsModel from "./postsModel";
import CommentsModel from "../comments/commentsModel"
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const createPost = async (req: any, res: any) => {
  try {
    const { header, content, date } = req.body;
    const { user } = req.cookies; 
    if (!secret) throw new Error("No secret");

    const decoded = jwt.decode(user, secret);
    const userId = decoded.userId;

    const postDB = await PostsModel.create({ user: userId, header, content, date });
    res.send({ post: postDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};


export const deletePost = async (req: any, res: any) => {
  try {
    const { _id } = req.body;
    const post = await PostsModel.findById(_id);
    await PostsModel.deleteOne({ _id });
    await CommentsModel.deleteMany({ post: _id });

    const posts = await PostsModel.find({});
    res.send({ ok: true, posts });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "cannot find or delete post" });
  }
};

  export const editPost = async (req: any, res: any) => {
    try {
      const { postId, content } = req.body;
  
      const postDB = await PostsModel.findOneAndUpdate(
        { _id: postId },
        { content },
        { new: true }
      );
      if (!postDB) throw new Error("Could not find order");
  
      res.send({ post: postDB });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  };

  export const getPosts = async (req: any, res: any) => {
    try {
      const posts = await PostsModel.find({}).sort({ date: -1 });
      res.send({ posts });
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  export const getPostsOfUser = async (req: any, res: any) => {
    try {
      const { user } = req.cookies;
      if (!secret) throw new Error("No secret");
  
      const decoded = jwt.decode(user, secret);
      const userId = decoded.userId;
  
      const posts = await PostsModel.find({ user: userId });
      res.send({ posts });
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

export const updatePost = async (req: any, res: any) => {
  try {
    const { header, content, postId } = req.body;

    if (!postId) {
      return res.status(400).send({ error: "postId is required" });
    }

    const postDB = await PostsModel.findByIdAndUpdate(
      postId,
      { $set: { header, content, } },
      { new: true }
    );

    if (!postDB) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ ok: true, post: postDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
