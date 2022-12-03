import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateListDto {

  @IsNotEmpty({ message: 'Password is required' })
  name: string;
  
}


