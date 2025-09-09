import { Injectable } from '@nestjs/common';
import { BalanceAccount } from './entities/balance_account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceAccountsService {
  constructor(
    @InjectRepository(BalanceAccount)
    private balanceAccountsRepository: Repository<BalanceAccount>
  ) {}

  create(balanceAccount: Partial<BalanceAccount>): Promise<BalanceAccount> {
    return this.balanceAccountsRepository.save(balanceAccount);
  }

  async getAll(userId: number) {
    return await this.balanceAccountsRepository.find({
      where: {
        user_id: userId
      },
      relations: ['type']
    });
  }

  async getByTypeId(userId: number, typeId: number) {
    return await this.balanceAccountsRepository.find({
      where: {
        user_id: userId,
        type_id: typeId
      }
    });
  }

  update(id: number, balanceAccount: Partial<BalanceAccount>) {
    return this.balanceAccountsRepository.update(id, balanceAccount);
  }

}
