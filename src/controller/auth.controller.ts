import { Body, Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';
import SuccessDataMessage from 'src/core/success.data.message';
import SuccessMessage from 'src/core/success.message';
import LoginDto from 'src/domain/dto/login.dto';
import RegisterDto from 'src/domain/dto/register.dto';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {

  // inject user service
  constructor(private readonly authService: AuthService) { }

  //save user to database
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async register(@Body() body: RegisterDto, @Req() request: Request): Promise<SuccessMessage> {
    await this.authService.register(body);
    return new SuccessMessage('User saved successfully', request.url);
  }

  // login user
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() body: LoginDto, @Req() request: Request): Promise<SuccessDataMessage<string>> {

    const token = await this.authService.login(body);
    return new SuccessDataMessage<string>("Login successfully", token, request.url);
  }



}
