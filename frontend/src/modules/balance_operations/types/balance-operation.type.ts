import type { BalanceAccount } from "../../balance_accounts/types/balance-account.type";
import type { Category } from "../../Categories/types/categories.type";

export type detailData = {
  id: number;
  account_id: number;
  account: BalanceAccount;
  amount: number;
  next_acc_amount: number;
  prev_acc_amount: number;
  operation_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};

export type typeOpData = {
  id: number;
  slug: string;
  label: string;
  status: number;
  created_at: string;
  updated_at: string;
};
export type BalanceOperation = {
  id: number;
  type_id: number;
  user_id: number;
  category_id: number;
  amount: number;
  category: Category;
  details: detailData[];
  type: typeOpData;
  status: number;
  created_at: string;
  updated_at: string;
};