import { Body, Controller, Get, Post } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('op')
export class OperationsController {
    constructor(private operationsService: OperationsService) {}

    @Get('/')
    async getOperations() {
        //return await this.operationsService.getOperations();
    }

    @Post('/')
    async createOperation(@Body() operation: CreateOperationDto) {
        //return await this.operationsService.createOperation();
        return this.operationsService.createMovement(operation);
    }
}
