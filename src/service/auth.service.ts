import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginDto from 'src/domain/dto/login.dto';
import RegisterDto from 'src/domain/dto/register.dto';
import { User } from 'src/domain/entity/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByMail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    const payload = { username: user.mail, sub: user.password };
    return this.jwtService.sign(payload);
  }


  async register(body: RegisterDto): Promise<User> {

    // create user
    const user = new User();
    user.firstName = body.name;
    user.lastName = body.surname;
    user.mail = body.mail;

    // TODO: hash password
    user.password = body.password;

    return await this.userService.save(user);
  }
}