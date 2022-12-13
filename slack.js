require('dotenv').config();
const axios = require('axios');
const SLACK_KEY = process.env.SLACK_BOT_KEY;

//send a slack message using the slack api
module.exports.sendSlackMessage = async (CHANNEL_ID, MESSAGE_TEXT) => {
  var headers = {
    Authorization: 'Bearer ' + SLACK_KEY,
  };
  var body = {
    channel: CHANNEL_ID, // Slack user or channel, where you want to send the message
    text: MESSAGE_TEXT,
  };

  // post a message using axios and the slack api
  await axios.post('https://slack.com/api/chat.postMessage', body, { headers: headers });
};
