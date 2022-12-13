require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const SLACK_KEY = process.env.SLACK_KEY;

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
  console.log('sending....', CHANNEL_ID, MESSAGE_TEXT);

  /*
  var headers = {
    Authorization: 'Bearer ' + SLACK_KEY,
  };
  var body = {
    channel: CHANNEL_ID, // Slack user or channel, where you want to send the message
    text: MESSAGE_TEXT,
  };

  // post a message using axios and the slack api
  axios
    .post('https://slack.com/api/chat.postMessage', body, { headers: headers })
    .then((response) => {
      //console log the response
      console.log('Message sent!!!', response);
    })
    .catch((error) => {
      console.log('Error sending message', error);
    });
    */
};
