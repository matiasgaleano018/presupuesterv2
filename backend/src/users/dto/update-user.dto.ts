import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(2)
    first_name: string;

    @IsString()
    @MinLength(2)
    last_name: string;

    @IsEmail()
    email: string;
}
