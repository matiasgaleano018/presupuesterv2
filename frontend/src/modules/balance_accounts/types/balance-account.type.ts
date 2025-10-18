export type BalanceAccountType = {
    id: number;
    slug: string;
    label: string;
    status: number;
    created_at: Date;
    updated_at: Date;
};

export type BalanceAccount = {
    id: number;
    type_id: number;
    label: string;
    user_id: number;
    amount: number;
    number: string;
    status: number;
    description: string;
    type: BalanceAccountType;
    created_at: Date;
    updated_at: Date;
};