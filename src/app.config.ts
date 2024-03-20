import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const APP_CONFIG = {
  port: process.env.PORT || 3000,
  db: {
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'pwd123',
    dbName: process.env.DB_NAME || 'postgres',
    username: process.env.USER_NAME,
  },
};
