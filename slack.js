require('dotenv').config();
const axios = require('axios');
const SLACK_BOT_KEY = process.env.SLACK_BOT_KEY;

//send a slack message using the slack api
module.exports.sendSlackMessage = async (CHANNEL_ID, MESSAGE_TEXT) => {
  var headers = {
    Authorization: 'Bearer ' + SLACK_BOT_KEY,
  };
  var body = {
    channel: CHANNEL_ID, // Slack user or channel, where you want to send the message
    text: MESSAGE_TEXT,
  };

  // post a message using axios and the slack api
  await axios.post('https://slack.com/api/chat.postMessage', body, { headers: headers });
};

//get the last N messages from a slack channel
module.exports.getMessages = async (channel) => {
  const res = await axios.get(
    `https://slack.com/api/conversations.history?channel=${channel}&limit=10&pretty=1`,
    {
      headers: {
        Authorization: 'Bearer ' + SLACK_BOT_KEY,
      },
    }
  );

  let text =
    'You are an AI named Ava having a conversation with Erik, Alex, Sam, Solon, and Schuyler\n';
  for (let i = res.data.messages.length - 1; i >= 0; i--) {
    text += (await getName(res.data.messages[i].user)) + ': \n';
    text += res.data.messages[i].text.replace(/```/g, '') + '\n';
  }
  text += 'please respond to the last message including the context of the previous messages\n';

  return text;
};

const getName = async (userID) => {
  const res = await axios.get(`https://slack.com/api/users.profile.get?user=${userID}&pretty=1`, {
    headers: {
      Authorization: 'Bearer ' + SLACK_BOT_KEY,
    },
  });
  return res.data.profile.real_name;
};
