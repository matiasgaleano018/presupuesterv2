import { useEffect, useState } from "react";
import useGetAccounts from "./hooks/useGetAccounts";
import Swal from "sweetalert2";
import SelectSimple from "../../components/ui/SelectSimple";

type BalanceAccountOptions = {
  value: number;
  label: string;
};
type Props = {
  name: string;
};
function BalanceAccountSelect({ name }: Props) {
  const [accounts, setAccounts] = useState<BalanceAccountOptions[]>([]);
  useEffect(() => {
    useGetAccounts()
      .then((data) =>
        setAccounts(
          data.map((account) => {
            return {
              value: account.id,
              label:
                account.label +
                "-" +
                account.number +
                "-" +
                "Gs " +
                account.amount,
            };
          })
        )
      )
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);
  return (
    <>
      <SelectSimple
        options={accounts}
        onChange={() => {}}
        name={name}
        placeholder="Seleccione una cuenta"
      />
    </>
  );
}

export default BalanceAccountSelect;
