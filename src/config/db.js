const dns = require('dns');
const mongoose = require('mongoose');

// Windows/local DNS often breaks Node's SRV lookup for mongodb+srv://
// (querySrv ECONNREFUSED). Public resolvers fix Atlas hostname discovery.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Long-running Express API (single instance assumed). Using driver defaults for
// pool size; tune maxPoolSize later if concurrent load requires it.
const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  mongoose.set('strictQuery', true);

  const conn = await mongoose.connect(uri, {
    // Fail fast if Atlas/cluster is unreachable
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`);

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  return conn;
};

module.exports = connectDB;
