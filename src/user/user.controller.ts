import { Request, Response } from "express";
import RegisterInput from "./inputs/register.input";
import UserService from "./user.service";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async register(req: Request, res: Response): Promise<any> {
    try {
      const payload: RegisterInput = req.body;
      await this.userService.register(payload);
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      res.status(400).json({ error: "User could not be created" });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const user = await this.userService.updateUser(+req.params.id, req.body);
      res.status(200).json({ user, message: "User updated successfully!" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async changePassword(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      await this.userService.changePassword(+id, oldPassword, newPassword);
      res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async changeEmail(req: Request, res: Response): Promise<any> {
    try {
      const { oldEmail, newEmail } = req.body;
      await this.userService.changeEmail(oldEmail, newEmail);
      res.status(200).json({ message: "Email updated successfully!" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      await this.userService.deleteUser(+id);
      res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      res.status(404).json({ error: `User with id: ${id} could not be deleted` });
    }
  }
}
