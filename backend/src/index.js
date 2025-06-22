import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";
import userRoutes from "./routes/userRoutes.js";
import stepsRoutes from "./routes/stepsRoutes.js";
import coinsRoutes from "./routes/coinsRoutes.js";

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);
const WEBHOOK_URL = process.env.WEBHOOK_URL;
bot.setWebHook(`${WEBHOOK_URL}/webhook`);

app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await prisma.user.upsert({
    where: { telegramId: String(chatId) },
    update: {},
    create: { telegramId: String(chatId) }
  });
  bot.sendMessage(chatId, "👋 Привет! Открой Sun Walk Mini App: [Нажми](https://t.me/YOUR_BOT?startapp)", { parse_mode: "Markdown" });
});

app.use("/api/user", userRoutes);
app.use("/api/steps", stepsRoutes);
app.use("/api/coins", coinsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
