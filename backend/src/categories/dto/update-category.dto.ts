import { IsString, IsNumber, MinLength, Min, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @MinLength(3)
    label: string;

    @IsString()
    @MinLength(3)
    slug: string;

    @IsNumber()
    isActive?: number;
}