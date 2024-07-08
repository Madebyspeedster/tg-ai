const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "ТУТ ВАШ АПІ КЛЮЧ",
});

const generateImg = async (msg) => {
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: msg,
    });

    return image.data[0].url;
  } catch (error) {
    console.error("Сталась помилка при генерації картинки", error);
    return null;
  }
};

const askQuestion = async (question) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Упс, щось пішло не так:", error);
    return null;
  }
};

module.exports = {
  generateImg,
  askQuestion,
};
