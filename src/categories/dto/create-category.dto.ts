import { IsString, IsNumber, MinLength, Min, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(3)
    label: string;

    @IsString()
    @MinLength(3)
    slug: string;

    @IsString()
    type_slug: string;

    @IsOptional()
    @IsNumber()
    isActive?: number;
}