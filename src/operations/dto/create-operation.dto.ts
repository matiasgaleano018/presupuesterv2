import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateOperationDto {
    @IsString()
    type_slug: string;

    @IsNumber()
    @Min(1)
    user_id: number;

    @IsNumber()
    @Min(1)
    category_id: number;

    @IsNumber()
    amount: number;

    @IsNumber()
    target_account_id: number;

    @IsOptional()
    @IsNumber()
    source_account_id: number;
}