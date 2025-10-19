import { useState } from "react";
import SelectSimple from "../../../components/ui/SelectSimple";
import CategorySelect from "../../Categories/components/CategorySelect";

type FormData = {
  start_date: string;
  end_date: string;
  type_slug: string;
  category_id: string;
};

type OptionType = {
  value: string | number;
  label: string;
};

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: keyof FormData, value: OptionType | null) => void;
  formData: FormData;
};

type ShowFilter = "category" | "type" | "";

function FormMovementFilter({
  onSubmit,
  onChange,
  onSelectChange,
  formData,
}: Props) {
  const [showFilter, setShowFilter] = useState<ShowFilter>("");
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="row w-100">
            <div className="col-md-4 col-12 form-outline form-white mb-4">
              <label htmlFor="daterange" className="form-label">
                Fecha de inicio
              </label>
              <input
                type="date"
                name="start_date"
                className="form-control"
                value={formData.start_date}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-4 col-12 form-outline form-white mb-4">
              <label htmlFor="daterange" className="form-label">
                Fecha de fin
              </label>
              <input
                type="date"
                name="end_date"
                className="form-control"
                value={formData.end_date}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-4 col-12 form-outline form-white mb-4">
              <label htmlFor="daterange" className="form-label">
                Filtrar por
              </label>
              <select
                name="filter"
                className="form-control"
                onChange={(e) => setShowFilter(e.target.value as ShowFilter)}
              >
                <option value="">Sin filtro</option>
                <option value="type">Tipo de operación</option>
                <option value="category">Categoria</option>
              </select>
            </div>
            {showFilter === "type" && (
              <div className="col-md-4 col-12 form-outline form-white mb-4">
                <label htmlFor="daterange" className="form-label">
                  Tipo
                </label>
                <SelectSimple
                  options={[
                    { value: "income", label: "Ingreso" },
                    { value: "expense", label: "Egreso" },
                    { value: "transfer", label: "Transferencia" },
                  ]}
                  name="type_slug"
                  placeholder="Seleccione un tipo"
                  onChange={(value) => onSelectChange("type_slug", value)}
                />
              </div>
            )}
            {showFilter === "category" && (
              <div className="col-md-4 col-12 form-outline form-white mb-4">
                <label htmlFor="daterange" className="form-label">
                  Categoria
                </label>
                <CategorySelect
                  type={"all"}
                  selectOnChange={(value) =>
                    onSelectChange("category_id", value)
                  }
                />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-start">
            <button className="btn btn-primary btn-lg px-5 ms-3" type="submit">
              <i className="fas fa-filter px-1"></i> Filtrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormMovementFilter;
