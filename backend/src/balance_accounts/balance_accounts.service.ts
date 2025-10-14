import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BalanceAccount } from './entities/balance_account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { BalanceAccountTypes } from './entities/balance_account_type.entity';

@Injectable()
export class BalanceAccountsService {
  constructor(
    @InjectRepository(BalanceAccount)
    private balanceAccountsRepository: Repository<BalanceAccount>,

    @InjectRepository(BalanceAccountTypes)
    private balanceAccountsTypesRepository: Repository<BalanceAccountTypes>,
  ) {}

  create(userId: number, balanceAccount: Partial<BalanceAccount>): Promise<BalanceAccount> {
    const account = {
      ...balanceAccount,
      user_id: userId,
    };
    return this.balanceAccountsRepository.save(account);
  }

  async getAll(userId: number) {
    return await this.balanceAccountsRepository.find({
      where: { user_id: userId },
      relations: ['type'],
    });
  }

  async getAllTypes(){
    return await this.balanceAccountsTypesRepository.find();
  }

  async getByTypeId(userId: number, typeId: number) {
    return await this.balanceAccountsRepository.find({
      where: { user_id: userId, type_id: typeId },
    });
  }

  update(id: number, balanceAccount: Partial<BalanceAccount>) {
    return this.balanceAccountsRepository.update(id, balanceAccount);
  }

  async afectAccountAmount(
    id: number,
    amount: number,
    userId: number,
    manager?: EntityManager,
  ) {
    const repo = manager
      ? manager.getRepository(BalanceAccount)
      : this.balanceAccountsRepository;

    const account = await repo.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException('Cuenta no encontrada');
    }
    const prevAmount = account.amount;

    if (account.user_id !== userId || account.status !== 100) {
      throw new NotFoundException('Cuenta no encontrada o no disponible');
    }

    const newAmount = account.amount + amount;
    if (newAmount < 0) {
      throw new BadRequestException('Monto insuficiente en la cuenta');
    }

    account.amount = newAmount;
    const accountAfected = await repo.save(account);
    return {...accountAfected, prev_amount: prevAmount};
  }

  async insertDefaultAccount(userId: number){
    const account = {
      label: 'Efectivo',
      number: '0000',
      type_id: 10,
      user_id: userId,
      amount: 0
    };

    return this.balanceAccountsRepository.save(account);
  }

}
