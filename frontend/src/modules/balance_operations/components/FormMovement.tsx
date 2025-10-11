import SelectSimple from "../../../components/ui/SelectSimple";
import { NumericFormat } from "react-number-format";
import CategorySelect from "../../Categories/components/CategorySelect";

type Props = {
  type: "income" | "expense" | "transfer" | "ajust";
};
function FormMovement({ type }: Props) {
  const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  return (
    <>
      <form>
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
            <label htmlFor="category" className="form-label">
              Categoria
            </label>
            <CategorySelect type={type} />
          </div>
          {type === "transfer" && (
            <div className="form-outline form-white mb-4">
              <label htmlFor="category" className="form-label">
                Cuenta de origen
              </label>
              <SelectSimple options={options} onChange={() => {}} />
            </div>
          )}
          <div className="form-outline form-white mb-4">
            <label htmlFor="category" className="form-label">
              Cuenta de destino
            </label>
            <SelectSimple options={options} onChange={() => {}} />
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
            />
          </div>

          <div className="btn-group">
            <button className="btn btn-outline-light btn-lg px-5" type="submit">
              Agregar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormMovement;
