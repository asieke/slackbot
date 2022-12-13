const express = require('express');
const bodyParser = require('body-parser');

// Create an express app
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Create an endpoint for the 'ai' route
app.post('/ai', (req, res) => {
  // Log the request body to the console
  console.log('HELLO THERE HOW ARE YOU', req.body);
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
