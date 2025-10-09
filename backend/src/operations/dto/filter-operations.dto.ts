import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class FilterOperationsDto {
    @IsOptional()
    @IsString()
    type_slug: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    category_id: number;

    @IsOptional()
    @IsNumber()
    amount: number;

    @IsOptional()
    @IsNumber()
    target_account_id: number;

    @IsOptional()
    @IsNumber()
    source_account_id: number;

    @IsOptional()
    @IsNumber()
    limit: number;
}