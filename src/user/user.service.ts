import { compare, hash } from "bcrypt";
import { getRepository, Repository } from "typeorm";
import config from "../config/config";
import User from "./user.entity";
import RegisterInput from "./inputs/register.input";

export default class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async register(payload: RegisterInput): Promise<boolean> {
    const user = new User();
    const { email, password } = payload;

    // Generate hash
    const hashedPassword = await hash(password, config.auth.saltRounds);
    user.email = email.toLowerCase();
    user.password = hashedPassword;

    try {
      await this.userRepository.save({
        ...user,
        ...payload,
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async searchUsersByUsername(username: string, skip: number): Promise<any> {
    try {
      const users = await this.userRepository
        .createQueryBuilder("users")
        .where("LOWER(users.username) = LOWER(:username)", { username })
        .skip(skip)
        .take(25)
        .getMany();
      return users;
    } catch (error) {
      return error;
    }
  }

  public async getUsers(): Promise<any> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      return error;
    }
  }

  public async getUserById(id: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ id });
      return user;
    } catch (error) {
      return error;
    }
  }

  public async changePassword(id: number, oldPassword: string, newPassword: string): Promise<any> {
    try {
      const user = (await this.userRepository.findOne({ id })) as User;
      const isMatch = await compare(oldPassword, user.password);

      if (isMatch) {
        const hashedPassword = await hash(newPassword, config.auth.saltRounds);
        user.password = hashedPassword;
        await this.userRepository.save({ id, user });
        return true;
      }
    } catch (error) {
      return error;
    }
  }

  public async changeEmail(oldEmail: string, newEmail: string): Promise<any> {
    try {
      const user = (await this.userRepository.findOne({ email: oldEmail.toLowerCase() })) as User;
      user.email = newEmail.toLowerCase();
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      return error;
    }
  }

  public async updateUser(id: number, payload: any): Promise<any> {
    const user = new User();
    user.username = payload.username;

    try {
      const updatedUser = await this.userRepository.save({ id, user });
      return updatedUser;
    } catch (error) {
      return error;
    }
  }

  public async deleteUser(id: number): Promise<any> {
    try {
      const deleted = await this.userRepository.delete(id);
      return deleted;
    } catch (error) {
      return error;
    }
  }
}
