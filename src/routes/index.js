const express = require('express');
const healthRoutes = require('./healthRoutes');
const userRoutes = require('./user-route');
const dailyRoutes = require('./daily-route');
const chatRoutes = require('./chat-route');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/users', userRoutes);
router.use('/daily', dailyRoutes);
router.use('/chat', chatRoutes);

module.exports = router;