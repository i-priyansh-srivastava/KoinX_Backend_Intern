const express = require('express');
const router = express.Router();

const { getCryptos, getCryptoPrice } = require('../Controllers/CryptoData.js');;

router.get('/', getCryptos);
router.get('/price', getCryptoPrice); // Real-time price endpoint
module.exports = router;