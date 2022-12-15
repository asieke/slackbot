const express = require('express');
const bodyParser = require('body-parser');
const { sendSlackMessage, getMessages } = require('./slack');
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
  console.log(req.body.event);

  res.set('X-Slack-No-Retry', '1');
  res.sendStatus(200);

  const aiQuery = await getMessages(req.body.event.channel);
  console.log(aiQuery);
  let aiResponse = await getOpenAIResponse(aiQuery);
  console.log(aiResponse);
  const message = '```' + stripNewLines(aiResponse.text) + '```';
  try {
    await sendSlackMessage(req.body.event.channel, message);
    console.log('sent message: ' + message);
  } catch (err) {
    console.log(err);
  }

  console.log('-------------------------------------------------');
});

app.get('/ai', async (req, res) => {
  // parse a query param 'text' from the query
  /*call the slack messages API and get the text of the last json.numberOfPreviousMessagesToInclude messages*/
  const messages = await getMessages('C04E7U76C8L');

  console.log('trying to fetch messages');

  // send the response as plain text
  res.send(messages);
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
