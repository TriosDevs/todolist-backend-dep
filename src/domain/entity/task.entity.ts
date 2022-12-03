import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(type => List, list => list.tasks, { onDelete: 'CASCADE' })
  list: List;

}

