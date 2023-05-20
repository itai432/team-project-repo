import express from "express";
const router = express.Router();

import {
  createMessage,
  deleteMessage,
  editMessage,
  getMessages,
} from "./messagesControl";

router
  .get("/get-messages", getMessages)
  .post("/create-message", createMessage)
  .patch("/edit-message", editMessage)
  .delete("/delete-message", deleteMessage);

export default router;