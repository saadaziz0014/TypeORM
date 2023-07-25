import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Profile } from "./profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @OneToOne(() => Profile, { cascade: true, eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  profile: Profile;
}
