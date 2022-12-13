const express = require('express');

// Create an express app
const app = express();

// Create an endpoint for the 'ai' route
app.post('/ai', (req, res) => {
  // Log the request body to the console
  console.log(req.body);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
