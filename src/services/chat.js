const { randomUUID } = require('crypto');
const { getRedis } = require('../config/redis');

const MESSAGES_KEY = 'chat:main:messages';
const MAX_MESSAGES = 200;

const sendMessage = async (req, res, next) => {
  try {
    const { sender, text } = req.body;

    if (!sender?.trim() || !text?.trim()) {
      return res.status(400).json({ message: 'sender and text are required' });
    }

    const redis = getRedis();
    const message = {
      id: randomUUID(),
      sender: sender.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    await redis.lPush(MESSAGES_KEY, JSON.stringify(message));
    await redis.lTrim(MESSAGES_KEY, 0, MAX_MESSAGES - 1);

    return res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), MAX_MESSAGES);
    const redis = getRedis();
    const raw = await redis.lRange(MESSAGES_KEY, 0, limit - 1);
    const messages = raw.map((item) => JSON.parse(item)).reverse();

    return res.status(200).json({
      message: 'Messages fetched successfully',
      messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessages };
