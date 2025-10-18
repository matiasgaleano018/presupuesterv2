import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class FilterBalanceAccountDto {
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    status_active: Boolean
}