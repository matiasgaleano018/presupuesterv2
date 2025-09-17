import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { BalanceAccountsModule } from '../balance_accounts/balance_accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CategoriesModule, BalanceAccountsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
