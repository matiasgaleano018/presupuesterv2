import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { BalanceDetailType, BalanceOperationType, prepareOperationType } from '../types/operation.types';
import { TypeOperationService } from './type-operation.service';

@Injectable()
export class AjustOperationService implements TypeOperationService {
    private typeId = 40; private activeIdStatus = 100;
    static slug = 'ajust';

    prepareOperation(userId: number, operation: CreateOperationDto): prepareOperationType {
        if(operation.amount > 0){
            operation.amount *= -1
        }

        const balanceOperation: BalanceOperationType = {
            type_id: this.typeId,
            user_id: userId,
            category_id: operation.category_id,
            amount: operation.amount,
            status: this.activeIdStatus
        }

        const balanceDetail: Array<BalanceDetailType> = [
            {
            account_id: operation.target_account_id,
            amount: operation.amount
            }
        ]

        return { balanceOperation, balanceDetail }
    }
}