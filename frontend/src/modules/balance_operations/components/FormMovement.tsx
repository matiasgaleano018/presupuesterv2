import { NumericFormat } from "react-number-format";
import CategorySelect from "../../Categories/components/CategorySelect";
import BalanceAccountSelect from "../../balance_accounts/BalanceAccountSelect";
import { Link } from "react-router-dom";
import usePostMovements from "../hooks/usePostMovements";
import { useState } from "react";
import Swal from "sweetalert2";

type OptionType = {
  value: string | number;
  label: string;
};
type Props = {
  type: "income" | "expense" | "transfer" | "ajust";
  onSuccess: () => void;
};

type formData = {
  type_slug: string;
  category_id: number;
  amount: number;
  target_account_id: number;
  source_account_id?: number;
};

function FormMovement({ type, onSuccess }: Props) {
  const [formData, setFormData] = useState<formData>({
    amount: 0,
    category_id: 0,
    type_slug: type,
    target_account_id: 0,
    source_account_id: undefined,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.category_id === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes seleccionar una categoría",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (formData.target_account_id === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes seleccionar una cuenta de destino",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (type === "transfer" && formData.source_account_id === undefined) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes seleccionar una cuenta de origen",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (
      type === "transfer" &&
      formData.source_account_id === formData.target_account_id
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes seleccionar una cuenta diferente para el origen/destino",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    try {
      await usePostMovements({ body: formData });

      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (
    field: keyof formData,
    value: OptionType | null
  ) => {
    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      [field]: Number(value.value),
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="form-outline form-white mb-4">
            <label htmlFor="typeOp" className="form-label">
              Tipo de movimiento
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tipo de movimiento"
              name="typeOp"
              required
              readOnly
              value={type}
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="category_id" className="form-label">
              Categoria
            </label>
            <CategorySelect
              type={type}
              selectOnChange={(value) =>
                handleSelectChange("category_id", value)
              }
            />
          </div>
          {type === "transfer" && (
            <div className="form-outline form-white mb-4">
              <label htmlFor="category_id" className="form-label">
                Cuenta de origen
              </label>
              <BalanceAccountSelect
                name="source_account_id"
                selectOnChange={(value) =>
                  handleSelectChange("source_account_id", value)
                }
              />
            </div>
          )}
          <div className="form-outline form-white mb-4">
            <label htmlFor="category" className="form-label">
              Cuenta de destino
            </label>
            <BalanceAccountSelect
              name="target_account_id"
              selectOnChange={(value) =>
                handleSelectChange("target_account_id", value)
              }
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="amount" className="form-label">
              Monto
            </label>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="Gs "
              decimalScale={0}
              fixedDecimalScale
              allowNegative={false}
              className="form-control form-control-lg"
              placeholder="Ej: Gs 120.000"
              required
              name="amount"
              onValueChange={(values) => {
                const { value } = values;
                setFormData((prev) => ({
                  ...prev,
                  amount: Number(value),
                }));
              }}
            />
          </div>

          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/">
              <i className="fas fa-arrow-left px-1"></i> Volver
            </Link>
            <button className="btn btn-primary btn-lg px-5 ms-3" type="submit">
              <i className="fas fa-plus px-1"></i> Agregar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormMovement;
