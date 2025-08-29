import { Test, TestingModule } from '@nestjs/testing';
import { BalanceAccountsService } from './balance_accounts.service';

describe('BalanceAccountsService', () => {
  let service: BalanceAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceAccountsService],
    }).compile();

    service = module.get<BalanceAccountsService>(BalanceAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
