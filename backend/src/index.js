import express from "express";
import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";

const TOKEN = "7495507261:AAHN4E13tby-RUuMGWCZLCyPrlIizMvG7NE";
const URL = "https://sun-walk-production.up.railway.app";
const PORT = process.env.PORT || 8080;

// Инициализация бота без polling
const bot = new TelegramBot(TOKEN, { polling: false });

// Инициализация сервера Express
const app = express();
app.use(bodyParser.json());

// Маршрут для webhook Telegram
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Запуск сервера и установка webhook
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  try {
    const webhookUrl = `${URL}/bot${TOKEN}`;
    const result = await bot.setWebHook(webhookUrl);
    console.log(`✅ Webhook set to: ${webhookUrl}`);
    console.log(`Telegram response: ${JSON.stringify(result)}`);
  } catch (err) {
    console.error("❌ Webhook setup failed:", err);
  }
});
