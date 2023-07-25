import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  profile: Profile;
  @OneToMany(() => Post, (post) => post.user, { cascade: true, eager: true })
  post: Post[];
}
