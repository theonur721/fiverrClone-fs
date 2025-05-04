import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
} from "../controllers/gigcontrollers.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.get("/", getAllGigs);

router.get("/:id", getGig);

router.post("/", protect, createGig);

router.delete("/:id", protect, deleteGig);

export default router;
