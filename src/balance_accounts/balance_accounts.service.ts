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

  async afectAccountAmount(id: number, amount: number) {
    const account = await this.balanceAccountsRepository.findOneBy({ id: id });
    if(!account) {
      return new Error('Cuenta no encontrada');
    }
    const currentAmount = account.amount;
    const newAmount = currentAmount + amount;
    if(newAmount < 0) {
      return new Error('Monto insuficiente en la cuenta');
    }
    account.amount = newAmount;
    return this.balanceAccountsRepository.save(account);
  }

}
