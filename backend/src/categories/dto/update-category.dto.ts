import { IsString, IsNumber, MinLength, Min, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @MinLength(3)
    label: string;

    @IsString()
    @MinLength(3)
    slug: string;

    @IsBoolean()
    is_active: boolean;
}