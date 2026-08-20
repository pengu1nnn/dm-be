const { createClient } = require('redis');

let redisClient;

// Single shared client for this long-running Express process (node-redis
// multiplexes commands over one connection by default).
const connectRedis = async (uri) => {
  if (!uri) {
    throw new Error('REDIS_URI is not defined');
  }

  if (redisClient?.isOpen) {
    return redisClient;
  }

  redisClient = createClient({
    url: uri,
    socket: {
      connectTimeout: 10000,
      reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    },
  });

  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err.message);
  });

  redisClient.on('reconnecting', () => {
    console.warn('Redis reconnecting...');
  });

  await redisClient.connect();

  const host = new URL(uri.replace(/^rediss?:\/\//, 'https://')).hostname;
  console.log(`Redis connected: ${host}`);

  return redisClient;
};

const getRedis = () => {
  if (!redisClient?.isOpen) {
    throw new Error('Redis is not connected. Call connectRedis() first.');
  }
  return redisClient;
};

module.exports = { connectRedis, getRedis };
