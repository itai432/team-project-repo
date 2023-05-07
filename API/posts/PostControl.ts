import PostsModel from "./postsModel";


export const createPost = async (req:any, res:any) => {
    try {
      const {header,content,date} = req.body;
      const postDB = await PostsModel.create({header,content,date});
      res.send({post:postDB})
    } catch (error:any) {
      console.error(error);
        res.status(500).send({ error: error.message });
    }
  };


  export const deletePost = async (req: any, res: any) => {
    try {
      const { _id } = req.body;
  
      const deletePost = await PostsModel.deleteOne({ _id });
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
      const posts = await PostsModel.find({});
      res.send({ posts });
    } catch (error: any) {
      res.status(500).send(error);
    }
  };