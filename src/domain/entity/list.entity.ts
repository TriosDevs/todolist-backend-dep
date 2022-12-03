import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

}

