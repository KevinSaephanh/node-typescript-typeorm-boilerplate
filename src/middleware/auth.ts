import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = String(req.headers["authorization"]);
  const token = authHeader.split(" ")[1];

  // Validate token
  try {
    jwt.verify(token, config.auth.accessTokenSecret);
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }

  return next();
};

export const createAccessToken = (id: number): string => {
  return jwt.sign({ sub: id, iat: Date.now() }, config.auth.accessTokenSecret, {
    expiresIn: config.auth.tokenExpiresIn,
  });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
