import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent); // Organizer
router.get("/", getEvents); // Public
router.get("/:id", getEventById); // Public

export default router;
