import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";
import { Course } from "./course";

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
  @ManyToMany(() => Course, { cascade: true, eager: true })
  @JoinTable({ name: "User_Course" })
  courses: Course[];
}
