import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity()
export class List {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(type => User, user => user.lists)
  user: number;

  @OneToMany(type => Task, task => task.list, { onDelete: 'CASCADE' })
  tasks: Task[];

}

