import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import createTaskDto from 'src/domain/dto/create.task.dto';
import { Task } from 'src/domain/entity/task.entity';
import { Repository } from 'typeorm';
import { ListService } from './list.service';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>, private listService: ListService) { }

  async createTask(listId: number, body: createTaskDto) {
    
    const list = await this.listService.findById(listId);

    if (!list) {
      throw new HttpException('List not found', 500);
    }

    const task = new Task();
    task.name = body.name;
    task.isDone = false;
    task.list = list;

    await this.taskRepository.save(task);
  }

  async updateTask(taskId: number, body: createTaskDto) {

    const task = await this.taskRepository.findOneBy({id: taskId});    

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    if (body.name)
      task.name = body.name;

    if (body.isDone)
      task.isDone = body.isDone;

    return this.taskRepository.save(task);
  }

  deleteTask(id: number) {
    const task = this.taskRepository.findOneBy({id: id});
    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    return this.taskRepository.delete(id);
  }

}

