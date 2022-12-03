import { Body, Controller, Get, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';
import SuccessMessage from 'src/core/success.message';
import { RequestWithUser } from 'src/domain/dto/request.with.user.dto';
import UserDto from 'src/domain/dto/user.dto';
import { User } from 'src/domain/entity/user.entity';
import { UserService } from 'src/service/user.service';

@Controller('api/user')
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
export class UserController {

  // inject the service
  constructor(private userService: UserService) { }

  @Get()
  getProfile(@Req() request: RequestWithUser) {

    const user = request.user as unknown as User;
    user.createdAt = undefined;
    user.isConfirmed = undefined;
    user.password = undefined;

    return user;
  }

  // update a user
  @Put()
  async updateProfile(@Req() request: RequestWithUser, @Body() userDto: UserDto) {

    const user = request.user;
    await this.userService.update(user.id, userDto);
    return new SuccessMessage("User updated", request.url);
  }

}


