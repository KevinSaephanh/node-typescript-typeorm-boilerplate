import { Request, Response } from "express";
import LoginInput from "./inputs/login.input";
import AuthService from "./auth.service";

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response): Promise<any> {
    const payload: LoginInput = req.body;

    try {
      const token = await this.authService.login(payload);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: "Could not retrieve token" });
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<any> {}
}
