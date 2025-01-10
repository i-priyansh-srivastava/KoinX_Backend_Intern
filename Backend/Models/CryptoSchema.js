const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    name: String,
    price: Number,
    marketCap: Number,
    change24h: Number,
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crypto', CryptoSchema);