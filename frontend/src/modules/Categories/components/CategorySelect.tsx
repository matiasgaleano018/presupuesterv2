import { useEffect, useState } from "react";
import useGetCategories from "../hooks/useGetCategories";
import SelectSimple from "../../../components/ui/SelectSimple";

type categoryOptions = {
  value: number;
  label: string;
};

type Props = {
  type: "income" | "expense" | "transfer" | "ajust";
};
function CategorySelect({ type }: Props) {
  const [categories, setCategories] = useState<categoryOptions[]>([]);
  useEffect(() => {
    useGetCategories(type)
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
  }, [type]);
  return (
    <>
      <SelectSimple options={categories} onChange={() => {}} />
    </>
  );
}

export default CategorySelect;
