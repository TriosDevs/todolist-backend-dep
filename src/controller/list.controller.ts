import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';
import SuccessDataMessage from 'src/core/success.data.message';
import SuccessMessage from 'src/core/success.message';
import CreateListDto from 'src/domain/dto/create.list.dto';
import { RequestWithUser } from 'src/domain/dto/request.with.user.dto';
import { List } from 'src/domain/entity/list.entity';
import { ListService } from 'src/service/list.service';

@Controller("api/list")
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
export class ListController {

  constructor(private listService: ListService) { }

  @Get()
  async getHello(@Req() request: RequestWithUser) {
    const user = request.user;
    var result = await this.listService.getLists(user.id)
    return new SuccessDataMessage("Lists fetched", result, request.url);
  }

  @Post()
  async createList(@Req() request: RequestWithUser, @Body() list: CreateListDto) {
    const user = request.user;

    const err = await this.listService.countOfLists(user.id).then((count) => {
      if (count >= 5) {
        return "You can't create more than 5 lists"
      }
    });

    if (err) {
      throw new HttpException(err, 400);
    }

    this.listService.createList(user.id, list);
    return new SuccessMessage('List created', request.url);
  }

  @Put(":id")
  updateList(@Req() request: RequestWithUser, @Body() list: CreateListDto, @Param("id") id: number): SuccessMessage {
    const user = request.user;

    const res = this.listService.updateList(user.id, id, list);
    if (res)
      throw new HttpException("List not found!", 500);

    return new SuccessMessage('List updated', request.url);
  }

  @Delete(":id")
  deleteList(@Req() request: RequestWithUser, @Param("id") id: number): SuccessMessage {
    this.listService.deleteList(id);
    return new SuccessMessage('List deleted', request.url);
  }

  @Get(":id/tasks")
  async getList(@Req() request: RequestWithUser, @Param("id") id: number) {
    const user = request.user;

    let list = await this.listService.getList(id);
    if (!list) {
      return new SuccessDataMessage<List>('List fetched', new List(), request.url);
    }
    return new SuccessDataMessage<List>('List fetched', list, request.url);
  }
}

