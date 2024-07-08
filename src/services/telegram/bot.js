const { inlineKeyboard, COMMANDS, bot, userState } = require("./utils.js");
const { generateImg, askQuestion } = require("../openAi");

const handleMessage = async (command, chatId, message) => {
  bot.sendMessage(chatId, "Генерую відповідь...⏳");
  bot.sendDice(chatId, { emoji: "🎲" });

  if (command === COMMANDS.ASK) {
    const answer = await askQuestion(message);
    bot.sendMessage(chatId, answer);
  } else if (command === COMMANDS.IMG) {
    const url = await generateImg(message);
    bot.sendChatAction(chatId, "upload_photo");
    const response = `<a href="${url}">Image</a>`;
    bot.sendMessage(chatId, response, { parse_mode: "HTML" });
  }
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userData = userState.get(chatId);

  if (userData?.command) {
    await handleMessage(userData.command, chatId, msg.text);
    userState.delete(chatId);
  } else {
    bot.sendMessage(chatId, "👋 - Обери опцію", inlineKeyboard);
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const command = callbackQuery.data;

  userState.set(chatId, { command });

  if (command === COMMANDS.IMG) {
    bot.sendMessage(chatId, "Що будем малювати ❓");
  } else if (command === COMMANDS.ASK) {
    bot.sendMessage(chatId, "Що Вас цікавить ❓");
  }
});
