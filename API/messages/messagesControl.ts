import MessageModel from "./messageModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const createMessage = async (req: any, res: any) => {
  try {
    const { content } = req.body;
    const { user } = req.cookies;
    if (!secret) throw new Error("No secret");

    const decoded = jwt.decode(user, secret);
    const userId = decoded.userId;

    const messageDB = await MessageModel.create({ user: userId, content });
    res.send({ message: messageDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteMessage = async (req: any, res: any) => {
  try {
    const { _id } = req.body;

    const deleteMessage = await MessageModel.deleteOne({ _id });
    const messages = await MessageModel.find({});

    res.send({ ok: true, messages });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "Cannot find or delete message" });
  }
};

export const editMessage = async (req: any, res: any) => {
  try {
    const { messageId, content } = req.body;

    const messageDB = await MessageModel.findOneAndUpdate(
      { _id: messageId },
      { content },
      { new: true }
    );
    if (!messageDB) throw new Error("Could not find message");

    res.send({ message: messageDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getMessages = async (req: any, res: any) => {
  try {
    const messages = await MessageModel.find({});
    res.send({ messages });
  } catch (error: any) {
    res.status(500).send(error);
  }
};