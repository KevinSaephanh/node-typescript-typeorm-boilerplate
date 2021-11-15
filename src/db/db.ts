import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import User from "../user/user.entity";
import config from "../config/config";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  entities: [User],
  logging: "all",
  logger: "advanced-console",
  synchronize: false,
};

export default dbConfig;
