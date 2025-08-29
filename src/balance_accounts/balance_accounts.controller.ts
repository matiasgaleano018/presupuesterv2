import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { BalanceAccountsService } from './balance_accounts.service';
import { CreateBalanceAccountDto } from './dto/create-balance_account.dto';
import { UpdateBalanceAccountDto } from './dto/update-balance_account.dto';

@Controller('balance-accounts')
export class BalanceAccountsController {
  constructor(private readonly balanceAccountsService: BalanceAccountsService) {}

  @Get('/')
  getAll() {
    return this.balanceAccountsService.getAll(1);
  }

  @Get(':typeId')
  getByTypeId(@Param('typeId', ParseIntPipe) typeId: number) {
    return this.balanceAccountsService.getByTypeId(1, typeId);
  }

  @Post()
  create(@Body() createBalanceAccountDto: CreateBalanceAccountDto) {
    return this.balanceAccountsService.create(createBalanceAccountDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBalanceAccountDto: UpdateBalanceAccountDto) {
    return this.balanceAccountsService.update(id, updateBalanceAccountDto);
  }

}
