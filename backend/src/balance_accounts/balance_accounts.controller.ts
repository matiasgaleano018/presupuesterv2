import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { BalanceAccountsService } from './balance_accounts.service';
import { CreateBalanceAccountDto } from './dto/create-balance_account.dto';
import { UpdateBalanceAccountDto } from './dto/update-balance_account.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';

@Controller('balance-accounts')
export class BalanceAccountsController {
  constructor(private readonly balanceAccountsService: BalanceAccountsService) {}

  @Get('/')
  getAll(@GetUser() req: Auth) {
    const userId = req.user_id;
    return this.balanceAccountsService.getAll(userId);
  }

  @Get(':typeId')
  getByTypeId(@GetUser() req: Auth, @Param('typeId', ParseIntPipe) typeId: number) {
    const userId = req.user_id;
    return this.balanceAccountsService.getByTypeId(userId, typeId);
  }

  @Post()
  create(@GetUser() req: Auth, @Body() createBalanceAccountDto: CreateBalanceAccountDto) {
    const userId = req.user.id;
    return this.balanceAccountsService.create(userId, createBalanceAccountDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBalanceAccountDto: UpdateBalanceAccountDto) {
    return this.balanceAccountsService.update(id, updateBalanceAccountDto);
  }

}
