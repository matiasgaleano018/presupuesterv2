import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { BalanceDetailType, BalanceOperationType, prepareOperationType } from '../types/operation.types';

@Injectable()
export class IncomeOperationService {
    private typeId = 10; private activeIdStatus = 100;
    static slug = 'income';

    prepareOperation(operation: CreateOperationDto): prepareOperationType {
        const balanceOperation: BalanceOperationType = {
            type_id: this.typeId,
            user_id: operation.user_id,
            category_id: operation.category_id,
            amount: operation.amount,
            status: this.activeIdStatus
        };

        const balanceDetail: Array<BalanceDetailType> = [
            {
            account_id: operation.target_account_id,
            amount: operation.amount
            }
        ];

        return { balanceOperation, balanceDetail };
    }
}