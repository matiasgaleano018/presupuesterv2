import { IsString, IsNumber, MinLength, Min } from 'class-validator';

export class CreateBalanceAccountDto {
    @IsString()
    @MinLength(3)
    label: string;

    @IsString()
    @MinLength(3)
    number: string;

    @IsNumber()
    @Min(1)
    type_id: number;
}
