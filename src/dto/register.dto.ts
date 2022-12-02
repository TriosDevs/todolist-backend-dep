import { IsEmail, IsNotEmpty } from 'class-validator';


export default class RegisterDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEmail({}, { message: 'Invalid email' })
  mail: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  
}


