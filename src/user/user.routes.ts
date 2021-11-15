import { Request, Response, Router } from "express";
import UserController from "./user.controller";
import { authenticateToken } from "../middleware/auth";

const router = Router();
const userController = new UserController();

router.post("/register", (req: Request, res: Response) => {
  return userController.register(req, res);
});

router.patch("/:id", authenticateToken, (req: Request, res: Response) => {
  return userController.updateUser(req, res);
});

router.patch("/:id/change-password", authenticateToken, (req: Request, res: Response) => {
  return userController.changePassword(req, res);
});

router.patch("/:id/change-email", authenticateToken, (req: Request, res: Response) => {
  return userController.changeEmail(req, res);
});

router.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  return userController.deleteUser(req, res);
});

export default router;
