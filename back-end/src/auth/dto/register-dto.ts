import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class RegisterUserDto {
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

