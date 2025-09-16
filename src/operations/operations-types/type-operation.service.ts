import { Injectable } from "@nestjs/common";
import { prepareOperationType } from "../types/operation.types";
import { CreateOperationDto } from "../dto/create-operation.dto";

export interface TypeOperationService {
    prepareOperation(userId: number, operation: CreateOperationDto): prepareOperationType;
}