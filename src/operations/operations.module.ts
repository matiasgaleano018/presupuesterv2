import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceOperations } from './entities/balance-operation.entity';
import { BalanceDetails } from './entities/balance-detail.entity';
import { BalanceAccountsModule } from '../balance_accounts/balance_accounts.module';
import { IncomeOperationService } from './operations-types/income-operation.service';
import { ExpenseOperationService } from './operations-types/expense-operation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BalanceOperations, BalanceDetails]),
    BalanceAccountsModule
  ],
  providers: [OperationsService, IncomeOperationService, ExpenseOperationService],
  controllers: [OperationsController]
})
export class OperationsModule {}
