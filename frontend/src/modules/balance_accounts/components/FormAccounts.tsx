import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type OptionType = {
  value: string | number;
  label: string;
};

type formData = {
  type_id: number;
  label: string;
  number: string;
};
function FormAccounts() {
  const [options, setOptions] = useState<OptionType[]>([]);
  useEffect(() => {});

  const [formData, setFormData] = useState<formData>({
    type_id: 0,
    label: "",
    number: "",
  });
  const handleSelectChange = (value: OptionType | null) => {
    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      type_id: Number(value.value),
    }));
  };
  return (
    <>
      <form>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="form-outline form-white mb-4">
            <label htmlFor="typeOp" className="form-label">
              Tipo de cuenta
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tipo de movimiento"
              name="typeOp"
              required
              readOnly
              value={""}
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

export default FormAccounts;
