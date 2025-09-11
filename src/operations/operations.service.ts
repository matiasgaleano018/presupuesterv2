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

        private readonly balanceAccountsService: BalanceAccountsService, // 👈 ya disponible

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

    async createMovement(operation: CreateOperationDto) {
        var balanceOperation: BalanceOperationType;
        var balanceDetail: Array<BalanceDetailType>;
        var opType = operation.type_slug;

        switch(opType) {
            case IncomeOperationService.slug:
                const op = new IncomeOperationService();
                const opReadyToCreate = op.prepareOperation(operation);
                balanceOperation = opReadyToCreate.balanceOperation;
                balanceDetail = opReadyToCreate.balanceDetail;
                break;
            default:
                throw new Error('Operation type not found');                
        }

        const createOp = await this.createOperation(balanceOperation);
        const operationId = createOp.id;
        if(!operationId) throw new Error('Operation not created');

        for (const detail of balanceDetail){
            var addDetail = detail;
            addDetail['operation_id'] = operationId;
            try {
                await this.createDetails(addDetail);
                await this.balanceAccountsService.afectAccountAmount(detail.account_id, detail.amount);
            } catch (error) {
                await this.markAsFailed(operationId);
                throw error;
            }
        }

        return createOp;
    }
}
