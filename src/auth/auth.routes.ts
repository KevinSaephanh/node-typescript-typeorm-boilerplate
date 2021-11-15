import { Request, Response, Router } from "express";
import AuthController from "./auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", (req: Request, res: Response) => {
  return authController.login(req, res);
});

router.post("/refresh-token", (req: Request, res: Response) => {
  return authController.refreshToken(req, res);
});

export default router;
