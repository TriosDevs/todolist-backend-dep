import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  mail: string;

  @Column({ length: 8 })
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  isConfirmed: boolean;

  @OneToMany(type => List, list => list.user)
  lists: List[];

}

