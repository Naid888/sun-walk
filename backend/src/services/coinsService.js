import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const collectCoins = async (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) return res.status(400).json({ error: "telegramId required" });
  const user = await prisma.user.findUnique({ where: { telegramId } });
  const buffer = user.coinsBuffer || 0;
  await prisma.user.update({
    where: { telegramId },
    data: { coins: { increment: buffer }, coinsBuffer: 0 }
  });
  await prisma.transaction.create({
    data: { userId: user.id, type: "earn", amount: buffer, description: "Manual collect" }
  });
  res.json({ collected: buffer });
};

export const spendCoins = async (req, res) => {
  const { telegramId, amount, description } = req.body;
  if (!telegramId || !amount) return res.status(400).json({ error: "telegramId and amount required" });
  const user = await prisma.user.findUnique({ where: { telegramId } });
  if (user.coins < amount) return res.status(400).json({ error: "Not enough coins" });
  await prisma.user.update({
    where: { telegramId },
    data: { coins: { decrement: amount } }
  });
  await prisma.transaction.create({
    data: { userId: user.id, type: "spend", amount, description: description || "Spending" }
  });
  res.json({ spent: amount });
};

export const referralBonus = async (req, res) => {
  const { referrerId } = req.body;
  if (!referrerId) return res.status(400).json({ error: "referrerId required" });
  await prisma.user.update({
    where: { id: referrerId },
    data: { coins: { increment: 1000 } }
  });
  res.json({ bonus: 1000 });
};
