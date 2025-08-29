import { Test, TestingModule } from '@nestjs/testing';
import { BalanceAccountsController } from './balance_accounts.controller';
import { BalanceAccountsService } from './balance_accounts.service';

describe('BalanceAccountsController', () => {
  let controller: BalanceAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceAccountsController],
      providers: [BalanceAccountsService],
    }).compile();

    controller = module.get<BalanceAccountsController>(BalanceAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
