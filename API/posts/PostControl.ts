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
      console.log(req)
      const deletePost = await PostsModel.deleteOne({ _id });
      const posts = await PostsModel.find({});
  
      res.send({ ok: true, posts });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ error: "cannot find or delete post" });
    }
  };

  // export const deletePost = async (req: any, res: any) => {
  //   try {
  //     const { _id } = req.body;
  
  //     // Find the post
  //     const post = await PostsModel.findById(_id);
  
  //     if (!post) {
  //       return res.status(404).send({ error: "Post not found" });
  //     }
  
  //     const postId = post._id;
  
  //     // Delete the comments associated with the post
  //     await CommentsModel.deleteMany({ postId: postId });
  
  //     // Delete the post
  //     await PostsModel.findByIdAndDelete(_id);
  
  //     res.status(200).send({ message: "Post deleted successfully" });
  //   } catch (error: any) {
  //     console.error(error);
  //     res.status(500).send({ error: "Internal server error" });
  //   }
  // };
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
      const posts = await PostsModel.find({});
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
