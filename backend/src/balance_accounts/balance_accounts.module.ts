import { Module } from '@nestjs/common';
import { BalanceAccountsService } from './balance_accounts.service';
import { BalanceAccountsController } from './balance_accounts.controller';
import { BalanceAccount } from './entities/balance_account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceAccountTypes } from './entities/balance_account_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceAccount, BalanceAccountTypes])],
  controllers: [BalanceAccountsController],
  providers: [BalanceAccountsService],
  exports: [BalanceAccountsService],
})
export class BalanceAccountsModule {}
