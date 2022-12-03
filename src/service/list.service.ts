import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateListDto from 'src/domain/dto/create.list.dto';
import { List } from 'src/domain/entity/list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>) { }

  createList(userId: number, body: CreateListDto) {
    const list = new List();
    list.name = body.name;
    list.user = userId;
    this.listRepository.save(list);
  }

  async updateList(userId: number, listId: number, body: CreateListDto) {
    const list = await this.listRepository.findOneBy({ id: listId });

    if (!list) {
      throw new HttpException('List not found', 404);
    }

    if (body.name)
      list.name = body.name;

    return this.listRepository.save(list);
  }

  async deleteList(listId: number) {
    const list = await this.listRepository.findOneBy({ id: listId });

    if (!list) {
      throw new HttpException('List not found', 404);
    }

    return this.listRepository.delete({ id: listId });
  }

  async getList(id: number): Promise<List> {

    const result = this.listRepository.createQueryBuilder("list")
      .innerJoinAndSelect("list.tasks", "task")
      .where("list.id = :id", { id: id })
      .getOne();

    return result;
  }

  async save(list: List): Promise<List> {
    return this.listRepository.save(list);
  }

  async findById(id: number): Promise<List> {
    return this.listRepository.findOneBy({
      id: id
    });
  }
}



