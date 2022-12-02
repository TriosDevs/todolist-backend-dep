import { Body, Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';
import SuccessMessage from 'src/core/success.message';
import RegisterDto from 'src/domain/dto/register.dto';
import { UserService } from '../service/user.service';

@Controller('api/user')
export class UserController {

  // inject user service
  constructor(private readonly userService: UserService) {}

  //save user to database
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async register(@Body() body: RegisterDto, @Req() request: Request): Promise<SuccessMessage> {    
    await this.userService.register(body);
    return new SuccessMessage('User saved successfully', request.url);
  }


}
