import { Repository, getRepository } from "typeorm";
import { compare } from "bcrypt";
import { createAccessToken } from "../middleware/auth";
import User from "../user/user.entity";
import LoginInput from "./inputs/login.input";

export default class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async login(payload: LoginInput): Promise<string> {
    try {
      const { username, password } = payload;
      const user = (await this.userRepository.findOne({ username })) as User;

      // Check if user is active
      const { isActive } = user;
      if (!isActive) throw Error("Email associated with user is not verified");

      // Compare passwords between payload and user found
      const isMatch = await compare(password, user.password);
      if (!isMatch) throw Error("Passwords do not match");

      return createAccessToken(user.id);
    } catch (error) {
      return error;
    }
  }
}
