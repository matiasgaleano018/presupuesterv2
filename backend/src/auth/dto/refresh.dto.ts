import { IsString, IsNumber } from 'class-validator';

export class RefreshDto {
    @IsNumber()
    user_id: number

    @IsString()
    refresh_token: string
}