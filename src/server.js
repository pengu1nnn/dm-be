const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');

const startServer = async () => {
  try {
    await connectDB(config.mongoUri);
    await connectRedis(config.redisUri);

    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
