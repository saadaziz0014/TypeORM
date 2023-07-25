import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  postText: string;
  @ManyToOne(() => User, (user) => user.post, {
    onDelete: "CASCADE",
  })
  user: User;
}
