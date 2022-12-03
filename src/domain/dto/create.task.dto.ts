import { IsNotEmpty } from 'class-validator';

export default class CreateTaskDto {

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  isDone: boolean;
  
}


