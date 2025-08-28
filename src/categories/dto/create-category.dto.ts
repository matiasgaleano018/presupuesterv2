import { IsString, IsNumber, MinLength, Min } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(3)
    label: string;

    @IsString()
    @MinLength(3)
    slug: string;

    @IsNumber()
    @Min(1)
    type_id: number;

    @IsNumber()
    @Min(1)
    user_id: number;
}