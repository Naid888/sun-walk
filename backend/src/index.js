import express from "express";
import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";

const TOKEN = "7495507261:AAHN4E13tby-RUuMGWCZLCyPrlIizMvG7NE";
const URL = "https://sun-walk-production.up.railway.app";
const PORT = process.env.PORT || 8080;

const bot = new TelegramBot(TOKEN, { polling: false });
const app = express();
app.use(bodyParser.json());

// ✅ Здесь обрабатываем команду
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Бот работает! ✅");
});

// ✅ Вебхук эндпоинт
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ Запуск сервера и настройка вебхука
app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
  try {
    const res = await bot.setWebHook(`${URL}/bot${TOKEN}`);
    console.log("Webhook set:", res);
  } catch (err) {
    console.error("Webhook error:", err);
  }
});
