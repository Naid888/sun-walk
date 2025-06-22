import TelegramBot from "node-telegram-bot-api";
import express from "express";

const TOKEN = process.env.TELEGRAM_TOKEN; // твой токен из Railway Variable
const URL = process.env.WEBHOOK_URL;      // твой домен без точки в конце
const PORT = process.env.PORT || 8080;

const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${URL}/bot${TOKEN}`);

// Если нужен express:
const app = express();
app.use(express.json());
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

console.log(`Bot webhook listening on ${URL}/bot${TOKEN}`);
