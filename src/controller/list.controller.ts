import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';
import SuccessDataMessage from 'src/core/success.data.message';
import SuccessMessage from 'src/core/success.message';
import CreateListDto from 'src/domain/dto/create.list.dto';
import { RequestWithUser } from 'src/domain/dto/request.with.user.dto';
import { List } from 'src/domain/entity/list.entity';
import { ListService } from 'src/service/list.service';

@Controller("api/list")
@UseFilters(new HttpExceptionFilter())
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
    this.listService.deleteList(id);
    return new SuccessMessage('List deleted', request.url);
  }

  @Get(":id/tasks")
  @UseGuards(JwtAuthGuard)
  async getList(@Req() request: RequestWithUser, @Param("id") id: number) {
    const user = request.user;

    const list = await this.listService.getList(id);
    return new SuccessDataMessage<List>('List fetched', list, request.url);
  }
}

