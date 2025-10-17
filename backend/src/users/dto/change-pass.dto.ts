import { IsEmail, IsString } from "class-validator";

export class ChangePassDto {
    @IsEmail()
    email: string;

    @IsString()
    old_password: string;

    @IsString()
    new_password: string;
}