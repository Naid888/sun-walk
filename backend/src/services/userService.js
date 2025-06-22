import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { telegramId, referrerId } = req.body;
  if (!telegramId) return res.status(400).json({ error: "telegramId required" });
  const user = await prisma.user.upsert({
    where: { telegramId },
    update: {},
    create: { telegramId, referrerId: referrerId || null }
  });
  if (referrerId) {
    await prisma.user.update({
      where: { id: referrerId },
      data: { coins: { increment: 1000 } }
    });
  }
  res.json(user);
};

export const selectClan = async (req, res) => {
  const { telegramId, clanId } = req.body;
  if (!telegramId || !clanId) return res.status(400).json({ error: "telegramId and clanId required" });
  const user = await prisma.user.update({
    where: { telegramId },
    data: { clanId }
  });
  res.json(user);
};
