import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceOperations } from './entities/balance-operation.entity';
import { BalanceDetails } from './entities/balance-detail.entity';
import { CreateOperationDto } from './dto/create-operation.dto';
import { IncomeOperationService } from './operations-types/income-operation.service';
import { BalanceDetailType, BalanceOperationType } from './types/operation.types';
import { BalanceAccountsService } from '../balance_accounts/balance_accounts.service';
import { ExpenseOperationService } from './operations-types/expense-operation.service';
import { TransferOperationService } from './operations-types/transfer-operation.service';
import { AjustOperationService } from './operations-types/ajust-operation.service';
import { CategoriesService } from '../categories/categories.service';
import { FilterOperationsDto } from './dto/filter-operations.dto';

@Injectable()
export class OperationsService {
    constructor(
        @InjectRepository(BalanceOperations)
        private balanceOperationsRepository: Repository<BalanceOperations>,

        @InjectRepository(BalanceDetails)
        private balanceDetailsRepository: Repository<BalanceDetails>,

        private readonly balanceAccountsService: BalanceAccountsService,

        private readonly categoriesService: CategoriesService,

        private readonly incomeOperationService: IncomeOperationService,

        private readonly expenseOperationService: ExpenseOperationService,

        private readonly transferOperationService: TransferOperationService,

        private readonly ajustOperationService: AjustOperationService


    ) {}

    async getMovements(userId: number, filterOp: FilterOperationsDto): Promise<BalanceOperations[]> {
        let filters = {};
        if(filterOp?.category_id !== undefined && filterOp?.category_id !== null) {
            filters = {...filters, 'category_id': filterOp.category_id};
        }
        if(filterOp?.type_slug !== undefined && filterOp?.type_slug !== null) {
            filters = {...filters, 'type_slug': filterOp.type_slug};
        }
        if(filterOp?.amount !== undefined && filterOp?.amount !== null) {
            filters = {...filters, 'amount': filterOp.amount};
        }
        if(filterOp?.target_account_id !== undefined && filterOp?.target_account_id !== null) {
            filters = {...filters, 'target_account_id': filterOp.target_account_id};
        }
        if(filterOp?.source_account_id !== undefined && filterOp?.source_account_id !== null) {
            filters = {...filters, 'source_account_id': filterOp.source_account_id};
        }
        filters = {...filters, 'user_id': userId};
        
        // return this.balanceOperationsRepository.find({
        //     where: filters,
        //     order: { 'created_at': 'DESC' },
        //     take: filterOp?.limit || 10,
        //     relations: ['type', 'category']
        // }

        return this.balanceOperationsRepository.createQueryBuilder('operation')
        .where(filters)
        .orderBy('operation.created_at', 'DESC')
        .take(filterOp?.limit || 10)
        .leftJoinAndSelect('operation.details', 'detail')
        .leftJoinAndSelect('detail.account', 'account')
        .leftJoinAndSelect('operation.type', 'type')
        .leftJoinAndSelect('operation.category', 'category')
        .getMany();
    }

    async getDetailsMovements(userId: number, filterOp: FilterOperationsDto) {
        const details = this.balanceDetailsRepository.createQueryBuilder('detail')
        .innerJoinAndSelect('detail.operation', 'operation')
        .innerJoinAndSelect('detail.account', 'account')
        .innerJoinAndSelect('operation.type', 'type')
        .innerJoinAndSelect('operation.category', 'category')
        .where("operation.user_id = :userId", { userId })
        .orderBy('operation.created_at', 'DESC');

        if(filterOp?.category_id !== undefined && filterOp?.category_id !== null) {
            details.andWhere("operation.category_id = :categoryId", { categoryId: filterOp.category_id });
        }
        if(filterOp?.type_slug !== undefined && filterOp?.type_slug !== null) {
            details.andWhere("type.slug = :typeSlug", { typeSlug: filterOp.type_slug });
        }
        if(filterOp?.start_date !== undefined && filterOp?.start_date !== null) {
            details.andWhere("detail.created_at >= :startDate", { startDate: filterOp.start_date.toISOString() });
        }
        if(filterOp?.end_date !== undefined && filterOp?.end_date !== null) {
            details.andWhere("detail.created_at < :endDate", { endDate: filterOp.end_date.toISOString() });
        }

        return details.getMany();
    }

    async createMovement(userId: number, operation: CreateOperationDto): Promise<BalanceOperations> {
        return this.balanceOperationsRepository.manager.transaction(
            async (manager) => {
                try {
                    await this.categoriesService.isValidOrFail(operation.category_id, operation.type_slug, userId);
                } catch (error) {
                    throw new BadRequestException(error.message);
                }

                let balanceOperation: BalanceOperationType;
                let balanceDetails: BalanceDetailType[];

                switch (operation.type_slug) {
                    case IncomeOperationService.slug:
                        const opInReadyToCreate = this.incomeOperationService.prepareOperation(userId, operation);
                        balanceOperation = opInReadyToCreate.balanceOperation;
                        balanceDetails = opInReadyToCreate.balanceDetail;
                        break;
                    case ExpenseOperationService.slug:
                        const opExpReadyToCreate = this.expenseOperationService.prepareOperation(userId, operation);
                        balanceOperation = opExpReadyToCreate.balanceOperation;
                        balanceDetails = opExpReadyToCreate.balanceDetail;
                        break;
                    case TransferOperationService.slug:
                        const opTransReadyToCreate = this.transferOperationService.prepareOperation(userId, operation);
                        balanceOperation = opTransReadyToCreate.balanceOperation;
                        balanceDetails = opTransReadyToCreate.balanceDetail;
                        break;
                    case AjustOperationService.slug:
                        const opAjustReadyToCreate = this.ajustOperationService.prepareOperation(userId,operation);
                        balanceOperation = opAjustReadyToCreate.balanceOperation;
                        balanceDetails = opAjustReadyToCreate.balanceDetail;
                        break;
                    default:
                        throw new BadRequestException(`Operation type "${operation.type_slug}" not found`);
                }

                const createdOp = await manager.save(BalanceOperations, balanceOperation);

                if (!createdOp?.id) {
                    throw new InternalServerErrorException('Operation not created');
                }

                for (const detail of balanceDetails) {
                    const accountAfected = await this.balanceAccountsService.afectAccountAmount(
                        detail.account_id,
                        detail.amount,
                        userId,
                        manager,
                    );
                    const detailToSave = {
                         ...detail, 
                         operation_id: createdOp.id,
                         prev_acc_amount: accountAfected.prev_amount,
                         next_acc_amount: accountAfected.amount
                        };
                    await manager.save(BalanceDetails, detailToSave);
                }

                return createdOp;
            },
        );
    }
}
