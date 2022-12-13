const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const KEY = 'xoxb-2544746774-4518443850993-AKOrDbLVEcnUEu0BVK7aE5Wu';

// Create an express app
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Create an endpoint for the 'ai' route
app.post('/ai', (req, res) => {
  // Log the request body to the console
  console.log('YAY! I got a request!', req.body);

  // Send a slack message to the same channel in req.body
  sendSlackMessage(req.body.channel, 'Hello from the server!');

  res.json({ hello: 'world' });
});

// create a get endpoint for the 'ai' route
app.get('/ai', (req, res) => {
  // return a json object with the request body
  res.json({ hello: 'world' });
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});

const sendSlackMessage = (CHANNEL_ID, MESSAGE_TEXT) => {
  const payload = {
    token: KEY,
    channel: CHANNEL_ID,
    text: MESSAGE_TEXT,
  };

  axios
    .post('https://slack.com/api/chat.postMessage', payload)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
