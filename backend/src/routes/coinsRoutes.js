import express from "express";
import { collectCoins, spendCoins, referralBonus } from "../services/coinsService.js";
const router = express.Router();
router.post("/collect", collectCoins);
router.post("/spend", spendCoins);
router.post("/referral", referralBonus);
export default router;
