const express = require('express');
const bodyParser = require('body-parser');
const { sendSlackMessage } = require('./slack');
const { getOpenAIResponse } = require('./ai');
const { stripNewLines } = require('./lib');

// Create an express app
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Create an endpoint for the 'ai' route
app.post('/ai', (req, res) => {
  // Log the request body to the console
  console.log('YAY! I got a request!', req.body.event);

  // Send a slack message to the same channel in req.body
  sendSlackMessage(req.body.event.channel, 'Hello 2.0 from the server!');

  res.json({ hello: 'world' });
});

// create a get endpoint for the 'ai' route
app.get('/ai', async (req, res) => {
  // return a json object with the request body

  const data = await getOpenAIResponse(
    'give me 5 sweet nickname ideas if I was an NHL hockey player'
  );
  const message = '```' + stripNewLines(data.text) + '```';

  await sendSlackMessage('C04F9JW7BLH', message);
  console.log(data);
  res.json(data);
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
