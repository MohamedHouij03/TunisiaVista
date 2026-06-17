require('dotenv').config();
module.exports = {
  DB_URL: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tunisia_travel',
  PORT: parseInt(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
};
