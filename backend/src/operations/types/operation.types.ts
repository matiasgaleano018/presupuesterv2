export interface BalanceOperationType {
    type_id: number;
    user_id: number;
    category_id: number;
    amount: number;
    status: number;
}

export interface BalanceDetailType {
    account_id: number;
    amount: number;
}

export interface prepareOperationType {
    balanceOperation: BalanceOperationType;
    balanceDetail: Array<BalanceDetailType>;
}