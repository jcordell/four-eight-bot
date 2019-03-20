const token = process.env.token; 
const { WebClient } = require('@slack/client');

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'testbotv2';

class SlackBot {
  async send(text) {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await web.chat.postMessage({ channel: conversationId, text: text });
    console.log('Message sent: ', res.ts);
  };
}

module.exports = new SlackBot();