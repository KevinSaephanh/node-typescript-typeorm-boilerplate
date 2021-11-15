import "dotenv/config";

export default {
  port: process.env.PORT || 8000,
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    tokenExpiresIn: process.env.TOKEN_EXPIRES_IN,
    saltRounds: process.env.SALT_ROUNDS,
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};
