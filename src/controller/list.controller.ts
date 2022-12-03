import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import SuccessMessage from 'src/core/success.message';
import CreateListDto from 'src/domain/dto/create.list.dto';
import { RequestWithUser } from 'src/domain/dto/request.with.user.dto';
import { ListService } from 'src/service/list.service';

@Controller("api/list")
export class ListController {

  constructor(private listService: ListService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@Req() request: RequestWithUser): object {
    const user = request.user;
    return { message: 'Hello World!' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createList(@Req() request: RequestWithUser, @Body() list: CreateListDto): SuccessMessage {
    const user = request.user;

    this.listService.createList(user.id, list);

    return new SuccessMessage('List created', request.url);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updateList(@Req() request: RequestWithUser, @Body() list: CreateListDto, @Param("id") id: number): SuccessMessage {
    const user = request.user;

    this.listService.updateList(user.id, id, list);

    return new SuccessMessage('List updated', request.url);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteList(@Req() request: RequestWithUser, @Param("id") id: number): SuccessMessage {
    const user = request.user;

    this.listService.deleteList(id);

    return new SuccessMessage('List deleted', request.url);
  }
}

