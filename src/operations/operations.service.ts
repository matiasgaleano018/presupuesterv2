import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BalanceOperations } from './entities/balance-operation.entity';
import { BalanceDetails } from './entities/balance-detail.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import { IncomeOperationService } from './operations-types/income-operation.service';
import { BalanceDetailType, BalanceOperationType } from './types/operation.types';
import { BalanceAccountsService } from '../balance_accounts/balance_accounts.service';

@Injectable()
export class OperationsService {
    constructor(
        @InjectRepository(BalanceOperations)
        private balanceOperationsRepository: Repository<BalanceOperations>,

        @InjectRepository(BalanceDetails)
        private balanceDetailsRepository: Repository<BalanceDetails>,

        private readonly balanceAccountsService: BalanceAccountsService,

        private readonly incomeOperationService: IncomeOperationService

    ) {}

    private async createOperation(operation: Partial<BalanceOperations>) {
        return this.balanceOperationsRepository.save(operation);
    }

    private createDetails(details: Partial<BalanceDetails>) {
        return this.balanceDetailsRepository.save(details);
    }

    private markAsFailed(id: number) {
        return this.balanceOperationsRepository.update(id, { status: 0 });
    }

    async createMovement(operation: CreateOperationDto): Promise<BalanceOperations> {
        return this.balanceOperationsRepository.manager.transaction(
            async (manager) => {
                let balanceOperation: BalanceOperationType;
                let balanceDetails: BalanceDetailType[];

                switch (operation.type_slug) {
                    case IncomeOperationService.slug:
                    const opReadyToCreate = this.incomeOperationService.prepareOperation(operation);
                    balanceOperation = opReadyToCreate.balanceOperation;
                    balanceDetails = opReadyToCreate.balanceDetail;
                    break;
                    default:
                    throw new Error(`Operation type "${operation.type_slug}" not found`);
                }

                const createdOp = await manager.save(BalanceOperations, balanceOperation);

                if (!createdOp?.id) {
                    throw new Error('Operation not created');
                }

                for (const detail of balanceDetails) {
                    const detailToSave = { ...detail, operation_id: createdOp.id };
                    await manager.save(BalanceDetails, detailToSave);
                    await this.balanceAccountsService.afectAccountAmount(
                    detail.account_id,
                    detail.amount,
                    );
                }

                return createdOp;
            },
        );
    }
}
