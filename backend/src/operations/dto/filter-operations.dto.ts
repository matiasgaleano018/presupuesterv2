import { Type } from 'class-transformer';
import { IsString, IsNumber, Min, IsOptional, IsDate } from 'class-validator';

export class FilterOperationsDto {
    @IsOptional()
    @IsString()
    type_slug: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    category_id: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    amount: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    target_account_id: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    source_account_id: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    start_date: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    end_date: Date;
}