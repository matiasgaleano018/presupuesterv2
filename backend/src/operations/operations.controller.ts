import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { FilterOperationsDto } from './dto/filter-operations.dto';

@Controller('op')
export class OperationsController {
    constructor(private operationsService: OperationsService) {}

    @Get()
    async getMovements(@GetUser() req: Auth, @Query() opFilter: FilterOperationsDto) {
        const userId = req.user_id;
        return await this.operationsService.getMovements(userId, opFilter);
    }

    @Post()
    async createOperation(@GetUser() req: Auth, @Body() operation: CreateOperationDto) {
        //return await this.operationsService.createOperation();
        const userId = req.user_id;
        return this.operationsService.createMovement(userId, operation);
    }
}
