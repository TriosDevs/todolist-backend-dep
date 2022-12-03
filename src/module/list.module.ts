import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from 'src/controller/list.controller';
import { List } from 'src/domain/entity/list.entity';
import { ListService } from 'src/service/list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule {}
