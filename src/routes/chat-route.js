const express = require('express');
const { sendMessage, getMessages } = require('../services/chat');

const router = express.Router();

router.get('/messages', getMessages);
router.post('/messages', sendMessage);

module.exports = router;
