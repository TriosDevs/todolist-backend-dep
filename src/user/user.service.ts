import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import RegisterDto from 'src/dto/register.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async register(user: RegisterDto): Promise<User> {

    // create user
    const newUser = new User();
    newUser.firstName = user.name;
    newUser.lastName = user.surname;
    newUser.mail = user.mail;
    
    // TODO: hash password
    newUser.password = user.password;


    return await this.usersRepository.save(newUser);
  }
}