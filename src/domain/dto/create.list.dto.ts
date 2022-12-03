import { IsNotEmpty } from 'class-validator';

export default class CreateListDto {

  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  
}


