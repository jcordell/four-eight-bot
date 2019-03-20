const request = require('request-promise');
const moment = require('moment');
const _filter = require('lodash/filter')

class MflApi {
    async loadPlayerNameConverter() {
        const playerListUrl = 'http://www63.myfantasyleague.com/2018/export?TYPE=players&L=11083&W=&JSON=1';
        const playerList = await request.get(playerListUrl)
        this.playerNameDb = {};
        JSON.parse(playerList).players.player.forEach(player => this.playerNameDb[player.id] = player.name)
    }

    async loadFranchiseNamesConverter() {
        const url = 'https://www60.myfantasyleague.com/2019/export?TYPE=league&L=22627&APIKEY=&JSON=1';
        const league = await request.get(url);
        this.franchiseNamesDb = {};
        JSON.parse(league).league.franchises.franchise.forEach(franchise => this.franchiseNamesDb[franchise.id] = franchise.name);
    }

    async getNewAuctionsWon(delay = 200) {
        const transactionUrl = 'https://www60.myfantasyleague.com/2019/export?TYPE=transactions&L=22627&APIKEY=&W=&TRANS_TYPE=AUCTION_WON&FRANCHISE=&DAYS=&COUNT=&JSON=1'
        const res = await request.get(transactionUrl);
        const auctionResults = JSON.parse(res).transactions.transaction;
        const delayAgoTS = moment().subtract(delay, 'minutes').valueOf() / 1000;
        const auctions = _filter(auctionResults, result => parseInt(result.timestamp) >= delayAgoTS)
        // convert mfl ids to names, format cost, convert franchise id to name
        auctions.forEach(auction => auction.player = this.playerNameDb[auction.transaction.split('|')[0]])
        auctions.forEach(auction => auction.price = (parseInt(auction.transaction.split('|')[1]) / 1000000).toFixed(1).toString() + 'M')
        auctions.forEach(auction => auction.franchiseName = this.franchiseNamesDb[auction.franchise]);
        return auctions;
    }
}
