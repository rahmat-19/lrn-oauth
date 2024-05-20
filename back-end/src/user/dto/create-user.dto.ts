import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  provider: string;

  @ValidateIf(o => o.provider === 'cardential')
  @IsNotEmpty()
  password: string;

}
