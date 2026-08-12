const express = require('express');
const { postDaily, getDaily } = require('../services/daily');

const router = express.Router();

router.get('/', getDaily);
router.post('/', postDaily);

module.exports = router;