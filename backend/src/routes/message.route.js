import express from "express";
import {
  getAllcontacts,
  sendMessage,
  getChatPartners,
  getMessagesByUserId,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewire/auth.middlewire.js";
import { arcjetProtection } from "../middlewire/arcjet.middlewire.js";
const router = express.Router();

router.use(arcjetProtection, protectedRoute);
router.get("/contacts", getAllcontacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);

router.post("/send/:id", sendMessage);

export default router;
