import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, unique: true })
  username: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50, select: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false, select: false })
  isAdmin: boolean;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
