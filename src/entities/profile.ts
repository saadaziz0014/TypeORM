import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
