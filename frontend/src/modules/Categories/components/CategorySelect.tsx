import { useEffect, useState } from "react";
import SelectSimple from "../../../components/ui/SelectSimple";
import useGetCategories from "../hooks/useGetCategories";

type categoryOptions = {
  value: number | string;
  label: string;
};

type Props = {
  type: "income" | "expense" | "transfer" | "ajust" | "all";
  selectOnChange: (value: categoryOptions | null) => void;
};
function CategorySelect({ type, selectOnChange }: Props) {
  const [categories, setCategories] = useState<categoryOptions[]>([]);
  useEffect(() => {
    useGetCategories({ type, params: { status_active: true } })
      .then((res) => {
        setCategories(
          res.map((category) => {
            return { value: category.id, label: category.label };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <SelectSimple
        options={categories}
        onChange={selectOnChange}
        name="category_id"
        placeholder="Seleccione una categoria"
      />
    </>
  );
}

export default CategorySelect;
