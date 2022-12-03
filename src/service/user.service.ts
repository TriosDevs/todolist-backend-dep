import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserDto from 'src/domain/dto/user.dto';
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

  async getProfile(): Promise<UserDto> {

    const user = await this.usersRepository.findOneBy({ id: 1 });

    const dto = new UserDto();
    dto.name = user.firstName;
    dto.surname = user.lastName;
    dto.mail = user.mail;

    return dto;
  }

  async update(id: number, userDto: UserDto) {
  
    const user = await this.usersRepository.findOneBy({ id });

    if (userDto.name) {
      user.firstName = userDto.name;
    }

    if (userDto.surname) {
      user.lastName = userDto.surname;
    }

    if (userDto.mail) {
      user.mail = userDto.mail;
    }

    return this.usersRepository.save(user);
  }

}