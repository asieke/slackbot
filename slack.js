require('dotenv').config();
const axios = require('axios');
const SLACK_BOT_KEY = process.env.SLACK_BOT_KEY;

const users = {
  '': 'Erik',
  U02G0MYNY: 'Sam Dodson',
  U02G798BA: 'Alex Sieke',
  U02G8Q66U: 'Schuyler Laird',
  U02G8SNVD: 'Erik Anderson',
  U02GDKVGQ: 'Solon Aposhian',
  U04F8D1R0V7: 'Ava',
};

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
  //create a ts that is the timestamp from 20 minutes ago
  const ts = Math.floor(Date.now() / 1000) - 60 * 20;

  const res = await axios.get(
    `https://slack.com/api/conversations.history?channel=${channel}&limit=20&oldest=${ts}&pretty=1`,
    {
      headers: {
        Authorization: 'Bearer ' + SLACK_BOT_KEY,
      },
    }
  );

  const out = [];
  for (let i = res.data.messages.length - 1; i >= 0; i--) {
    //set a variable called text that replaces ``` with nothing
    const text = stripNewLines(replaceUserIDs(res.data.messages[i].text.replace(/```/g, '')));
    const user = users[res.data.messages[i].user];
    out.push({ text, user });
  }

  return out;
};

//write a function that takes a string, if it finds the pattern <@USER_ID> replace it with users[USER_ID]
const replaceUserIDs = (text) => {
  const matches = text.match(/<@.*?>/g);
  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const userID = matches[i].replace(/<|@|>/g, '');
      const name = users[userID];
      text = text.replace(matches[i], name);
    }
  }
  return text;
};

//trim any newlines from the beginning or end of a string, but not the middle of the string
const stripNewLines = (text) => {
  return text.replace(/^\n+|\n+$/g, '');
};
