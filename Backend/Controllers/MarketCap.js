const axios = require('axios');
const Crypto = require('../Models/CryptoSchema.js');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchMarketCap() {
  try {
    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
      },
    });

    for (const coin of COINS) {
      const { usd_market_cap: marketCap } = data[coin];

      await Crypto.findOneAndUpdate(
        { name: coin },
        { marketCap, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    console.log('Market cap updated successfully.');
  } catch (error) {
    console.error('Error fetching market cap:', error);
  }
}

async function fetch24hChange() {
  try {
    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    });

    for (const coin of COINS) {
      const { usd_24h_change: change24h } = data[coin];

      await Crypto.findOneAndUpdate(
        { name: coin },
        { change24h, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    console.log('24-hour change updated successfully.');
  } catch (error) {
    console.error('Error fetching 24-hour change:', error);
  }
}

module.exports = {
  fetchMarketCap,
  fetch24hChange,
};
