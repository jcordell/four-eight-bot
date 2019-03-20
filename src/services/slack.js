// const token = '542140805266.582254519924' // process.env.SLACK_BOT_TOKEN
const secret = '70f660f2457e4f7234bd3d2bf126f23c'
const token = 'xoxp-542140805266-543212477095-582294516066-f92e2f93eff1ab7b7fb6c57af5199fb4'
const { WebClient } = require('@slack/client');

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'testbotv2';

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();