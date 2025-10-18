export type CategoryType = {
    id: number;
    label: string;
    slug: string;
    status: number;
    created_at: string;
    updated_at: string;
}
export type Category = {
  id: number;
  label: string;
  slug: string;
  status: number;
  type_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  type: CategoryType
};