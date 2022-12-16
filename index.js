const express = require('express');
const bodyParser = require('body-parser');
const { sendSlackMessage, getMessages } = require('./slack');
const { getOpenAIResponse, generatePrompt } = require('./ai');
const { stripNewLines, removeBracketText } = require('./lib');

// Create an express app
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Create an endpoint for the 'ai' route
app.post('/ai', async (req, res) => {
  // Log the request body to the console

  console.log('-------------------------------------------------');
  console.log(req.body.event);

  res.set('X-Slack-No-Retry', '1');
  res.sendStatus(200);

  const slackHistory = await getMessages(req.body.event.channel);
  const aiPrompt = generatePrompt(slackHistory);
  console.log(aiPrompt);
  const aiResponse = await getOpenAIResponse(aiPrompt);
  console.log(aiResponse);
  const slackMessage = '```' + stripNewLines(aiResponse.text) + '```';
  try {
    await sendSlackMessage(req.body.event.channel, slackMessage);
    console.log('sent message');
  } catch (err) {
    console.log(err);
  }

  console.log('-------------------------------------------------');
});

app.get('/ai', async (req, res) => {
  // parse a query param 'text' from the query
  /*call the slack messages API and get the text of the last json.numberOfPreviousMessagesToInclude messages*/
  const slackHistory = await getMessages('C04E7U76C8L');
  const aiPrompt = generatePrompt(slackHistory);

  console.log('trying to fetch messages');

  // send the response as plain text
  res.send('<pre>' + aiPrompt + '</pre>');
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
