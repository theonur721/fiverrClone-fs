import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
} from "../controllers/gigcontrollers.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/", getAllGigs);

router.get("/:id", getGig);

router.post(
  "/",
  protect,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createGig
);

router.delete("/:id", protect, deleteGig);

export default router;
