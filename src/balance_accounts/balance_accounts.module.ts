import { Module } from '@nestjs/common';
import { BalanceAccountsService } from './balance_accounts.service';
import { BalanceAccountsController } from './balance_accounts.controller';
import { BalanceAccount } from './entities/balance_account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceAccount])],
  controllers: [BalanceAccountsController],
  providers: [BalanceAccountsService],
})
export class BalanceAccountsModule {}
