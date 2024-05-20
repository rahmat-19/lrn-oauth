import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;


  @Column()
  name: string;

  @Column({default: 'cardential'})
  provider: string

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({nullable: true})
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
