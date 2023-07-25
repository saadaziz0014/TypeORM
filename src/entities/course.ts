import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cname: string;
}
