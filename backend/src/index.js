import TelegramBot from 'node-telegram-bot-api';
import express from 'express';

const app = express();

const url = process.env.WEBHOOK_URL || 'https://sun-walk-production.up.railway.app';

const bot = new TelegramBot('7495507261:AAHN4E13tby-RUuMGWCZLCyPrlIizMvG7NE', {
  webHook: {
    port: process.env.PORT || 8080
  }
});

bot.setWebHook(`${url}/bot7495507261:AAHN4E13tby-RUuMGWCZLCyPrlIizMvG7NE`);

app.use(express.json());

app.post(`/bot7495507261:AAHN4E13tby-RUuMGWCZLCyPrlIizMvG7NE`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Бот запущен и работает через Railway.");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on ${process.env.PORT || 8080}`);
});
