const axios = require('axios');
const Crypto = require('../Models/CryptoSchema.js');


// Fetch all stored crypto data
exports.getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cryptocurrencies', error });
  }
};

// Fetch real-time price of cryptocurrencies
exports.getCryptoPrice = async (req, res) => {
  try {
    const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
    const COINS = ['bitcoin', 'matic-network', 'ethereum'];

    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching real-time cryptocurrency prices', error });
  }
};