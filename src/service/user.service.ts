import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByMail(mail: string): Promise<User> {
    return await this.usersRepository.findOneBy({ mail });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async save(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

}