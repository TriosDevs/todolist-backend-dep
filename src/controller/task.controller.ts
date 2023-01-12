import { Body, Controller, Delete, HttpException, Param, Post, Put, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';
import SuccessMessage from 'src/core/success.message';
import CreateTaskDto from 'src/domain/dto/create.task.dto';
import { RequestWithUser } from 'src/domain/dto/request.with.user.dto';
import { TaskService } from 'src/service/task.service';

@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('api/task')
export class TaskController {
  constructor(private taskSerivice: TaskService) { }

  @Post()
  create(@Req() request: RequestWithUser, @Body() body: CreateTaskDto, @Query() query): SuccessMessage {
    const user = request.user;    
    const res = this.taskSerivice.createTask(query.list, body);
    if (res)
      throw new HttpException("List not found!", 500);
    return new SuccessMessage('Task created', request.url);
  }

  @Put(":id")
  update(@Req() request: RequestWithUser, @Body() body: CreateTaskDto, @Param("id") id: number): SuccessMessage {
    this.taskSerivice.updateTask(id, body);
    return new SuccessMessage('Task updated', request.url);
  }

  @Delete(":id")
  delete(@Req() request: RequestWithUser, @Param("id") id: number): SuccessMessage {
    this.taskSerivice.deleteTask(id);
    return new SuccessMessage('Task deleted', request.url);
  }

}
