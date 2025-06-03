import express from "express";
import protect from "../middlewares/protect.js";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/reviewcontrollers.js";

const router = express.Router();

router.post("/", protect, createReview);

router.get("/:gigId", getReviews);

router.delete("/:id", protect, deleteReview);

export default router;
