declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      TOKEN_EXPIRES_IN: string;
      SALT_ROUNDS: number;
      DB_HOST: string;
      DB_NAME: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
