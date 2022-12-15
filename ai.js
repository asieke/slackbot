require('dotenv').config();
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

const getOpenAIResponse = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0];
};

const messageToJSON = async (text) => {
  const query = `I'm going to give you a JSON object:
      {
      queryText: 'text to be sent to openAI' //should be string
      numberOfPreviousMessagesToInclude: 'number of previous messages to send to openAI' //should be integer
      }

    Please take the following text and structure it into a valid JSON object with quotes around the properties.
    ${text}`;

  const response = await getOpenAIResponse(query);
  const jsonText = response.text.replace(/[\r\n]/g, '');
  return JSON.parse(jsonText.substring(jsonText.indexOf('{'), jsonText.lastIndexOf('}') + 1));
};

module.exports = { getOpenAIResponse, messageToJSON };
