require('dotenv').config()
const mfl = require('./services/mfl');
const slack = require('./services/slack');
const sleep = require('sleep')

async function setup() {
    await mfl.setup();
}

async function run() {
    await setup();
    while(1) {
        sleep.sleep(1 * 5)
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
    return `${auction.player} to ${auction.franchiseName} (${auction.price})`;
}

run();
