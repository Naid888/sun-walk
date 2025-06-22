import express from "express";
import { updateSteps, getHistory } from "../services/stepsService.js";
const router = express.Router();
router.post("/update", updateSteps);
router.get("/history", getHistory);
export default router;
