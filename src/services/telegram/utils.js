const TelegramBot = require("node-telegram-bot-api");
const COMMANDS = Object.freeze({
  ASK: "ask",
  IMG: "img",
});

const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Генерація Картинки 🖼️", callback_data: COMMANDS.IMG },
        { text: "Задати питання❔", callback_data: COMMANDS.ASK },
      ],
    ],
  },
};

const token = "ТУТ ВАШ ТОКЕН";

const userState = new Map();

const bot = new TelegramBot(token, { polling: true });

module.exports = {
  inlineKeyboard,
  COMMANDS,
  userState,
  bot,
};
