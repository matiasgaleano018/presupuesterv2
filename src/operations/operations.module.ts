import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceOperations } from './entities/balance-operation.entity';
import { BalanceDetails } from './entities/balance-detail.entity';
import { BalanceAccountsModule } from '../balance_accounts/balance_accounts.module';
import { IncomeOperationService } from './operations-types/income-operation.service';
import { ExpenseOperationService } from './operations-types/expense-operation.service';
import { TransferOperationService } from './operations-types/transfer-operation.service';
import { AjustOperationService } from './operations-types/ajust-operation.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BalanceOperations, BalanceDetails]),
    BalanceAccountsModule,
    CategoriesModule
  ],
  providers: [OperationsService, IncomeOperationService, ExpenseOperationService, TransferOperationService, AjustOperationService],
  controllers: [OperationsController]
})
export class OperationsModule {}
