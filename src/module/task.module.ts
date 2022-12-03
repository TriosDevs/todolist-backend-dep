import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entity/task.entity';
import { ListService } from 'src/service/list.service';
import { TaskController } from '../controller/task.controller';
import { TaskService } from '../service/task.service';
import { ListModule } from './list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
    ListModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule { }
