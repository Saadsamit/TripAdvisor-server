import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  Bcrypt_Hash_Round: process.env.BCRYPT_HASH_ROUND,
  client_url:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_HOST_URL
      : process.env.CLIENT_LOCAL_URL,
};

export default config;
