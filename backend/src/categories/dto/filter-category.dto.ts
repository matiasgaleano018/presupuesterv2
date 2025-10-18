import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class FilterCategoryDto {
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    status_active: Boolean
}