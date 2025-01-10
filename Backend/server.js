const express = require('express');
const cron = require('node-cron');
const connectDB = require('./Configurations/Database.js');
const fetchCryptoData = require('./Controllers/MarketCap.js');
const cryptoRoutes = require('./Routes/CryptoRoutes.js');
const cors = require('cors');

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/cryptos', cryptoRoutes);

cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency market cap...');
    await fetchMarketCap();
});

cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching 24-hour cryptocurrency change...');
    await fetch24hChange();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});