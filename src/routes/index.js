const express = require('express');
const healthRoutes = require('./healthRoutes');
const userRoutes = require('./user-route');
const dailyRoutes = require('./daily-route');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/user', userRoutes);
router.use('/users', userRoutes);
router.use('/daily', dailyRoutes);

module.exports = router;
