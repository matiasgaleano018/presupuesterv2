import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { BalanceDetailType, BalanceOperationType, prepareOperationType } from '../types/operation.types';

@Injectable()
export class TransferOperationService {
    private typeId = 30; private activeIdStatus = 100;
    static slug = 'transfer';

    prepareOperation(operation: CreateOperationDto): prepareOperationType {
        if( !operation.source_account_id ){
            throw new BadRequestException('Cuenta de origen no encontrada');
        }
        if( operation.source_account_id === operation.target_account_id ){
            throw new BadRequestException('Cuenta de origen y destino son iguales');
        }

        const balanceOperation: BalanceOperationType = {
            type_id: this.typeId,
            user_id: operation.user_id,
            category_id: operation.category_id,
            amount: operation.amount,
            status: this.activeIdStatus
        };

        const balanceDetail: Array<BalanceDetailType> = [
            {
            account_id: operation.source_account_id,
            amount: operation.amount * -1
            },
            {
            account_id: operation.target_account_id,
            amount: operation.amount
            }
        ];

        return { balanceOperation, balanceDetail };
    }
}