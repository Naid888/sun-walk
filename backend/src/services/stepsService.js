import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateSteps = async (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) return res.status(400).json({ error: "telegramId required" });
  const steps = 10; // TODO: заменить на расчёт по GPS
  const user = await prisma.user.update({
    where: { telegramId },
    data: { steps: { increment: steps }, coinsBuffer: { increment: steps } }
  });
  await prisma.stepsHistory.create({
    data: { userId: user.id, date: new Date(), steps, coinsEarned: steps }
  });
  res.json(user);
};

export const getHistory = async (req, res) => {
  const { telegramId } = req.query;
  if (!telegramId) return res.status(400).json({ error: "telegramId required" });
  const user = await prisma.user.findUnique({ where: { telegramId } });
  const history = await prisma.stepsHistory.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 30
  });
  res.json(history);
};
