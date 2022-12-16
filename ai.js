require('dotenv').config();
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

module.exports.getOpenAIResponse = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0];
};

module.exports.generatePrompt = (history) => {
  let text = `
  You are a chatbot named Ava, the following is a list of messages that you and the others in the chat have sent.
  ${history.map((m) => `${m.user}: ${m.text}`).join('\n')}
  Ava: `;

  return text;
};
