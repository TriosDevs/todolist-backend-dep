import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginDto {

  @IsEmail({}, { message: 'Invalid email' })
  mail: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  
}


