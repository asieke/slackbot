const express = require('express');
const bodyParser = require('body-parser');
const { sendSlackMessage } = require('./slack');
const { getOpenAIResponse } = require('./ai');
const { stripNewLines, removeBracketText } = require('./lib');

// Create an express app
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Create an endpoint for the 'ai' route
app.post('/ai', async (req, res) => {
  // Log the request body to the console

  console.log('-------------------------------------------------');
  console.log(req.body);
  console.log('-------------------------------------------------');

  const aiQuery = removeBracketText(req.body.event.text);
  const aiResponse = await getOpenAIResponse(aiQuery);
  const message = '```' + stripNewLines(aiResponse.text) + '```';
  await sendSlackMessage(req.body.event.channel, message);

  res.sendStatus(200);
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
