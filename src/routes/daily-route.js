const express = require('express');
const { postDaily, getDaily } = require('../services/daily');

const router = express.Router();

router.get('/', getDaily);
router.post('/', postDaily);
router.get('/daily', getDaily);
router.post('/daily', postDaily);

module.exports = router;
