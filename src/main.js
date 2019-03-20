require('dotenv').config()
const mfl = require('./services/mfl');
const slack = require('./services/slack');

async function setup() {
    await mfl.setup();
}

async function run() {
    await setup();
    while(1) {
        await _sleep(60 * 5)
        await _getToWork();
    }
}

async function _getToWork() {
    const newAuctions = await mfl.getNewAuctionsWon();
    for (let i = 0; i < newAuctions.length; i++) {
        slack.send(_formatSlackString(newAuctions[i]))
    }
}

function _formatSlackString(auction) {
    return `*${auction.player}* to ${auction.franchiseName} (${auction.price})`;
}

function _sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}
  
run();
