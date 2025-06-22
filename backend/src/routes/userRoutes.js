import express from "express";
import { registerUser, selectClan } from "../services/userService.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/select-clan", selectClan);
export default router;
