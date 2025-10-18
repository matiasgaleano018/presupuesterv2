import { PartialType } from '@nestjs/mapped-types';
import { CreateBalanceAccountDto } from './create-balance_account.dto';
import { IsBoolean, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateBalanceAccountDto extends PartialType(CreateBalanceAccountDto) {
    @IsString()
    @MinLength(3)
    label: string;

    @IsString()
    @MinLength(3)
    number: string;

    @IsBoolean()
    is_active: boolean;
}
