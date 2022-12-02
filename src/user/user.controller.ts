import { Body, Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/httpexceptionfilter';
import SuccessMessage from 'src/core/successmessage.entity';
import RegisterDto from 'src/dto/register.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

  // inject user service
  constructor(private readonly userService: UserService) {}

  //save user to database
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async register(@Body() user: RegisterDto, @Req() request: Request): Promise<SuccessMessage> {
    await this.userService.register(user);
    return new SuccessMessage('User saved successfully', request.url);
  }

  // get user
  // update user
  // delete user



}
