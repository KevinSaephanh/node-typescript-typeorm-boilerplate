import express from "express";
import { createConnection } from "typeorm";
import dbConfig from "./db/db";
import AuthRouter from "./auth/auth.routes";
import UserRouter from "./user/user.routes";

export default class Server {
  private readonly PORT = process.env.PORT || 8000;
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.dbConnect();
    this.routes();
  }

  private config() {
    this.app.use();
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/users", UserRouter);
  }

  private async dbConnect() {
    await createConnection(dbConfig);
  }

  public start() {
    this.app.listen(this.PORT, () => console.log(`Server is listening on port: ${this.PORT}`));
  }
}

const server = new Server();
server.start();
