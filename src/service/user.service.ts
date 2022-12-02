import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import RegisterDto from 'src/domain/dto/register.dto';
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

  async register(body: RegisterDto): Promise<User> {    

    // create user
    const user = new User();
    user.firstName = body.name;
    user.lastName = body.surname;
    user.mail = body.mail;

    // TODO: hash password
    user.password = body.password;

    return await this.usersRepository.save(user);
  }
}