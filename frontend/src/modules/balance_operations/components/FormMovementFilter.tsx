import { useState } from "react";
import SelectSimple from "../../../components/ui/SelectSimple";
import CategorySelect from "../../Categories/components/CategorySelect";
import dayjs from "dayjs";
import Swal from "sweetalert2";

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
function FormMovementFilter() {
  const [formData, setFormData] = useState<FormData>({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    type_slug: "",
    category_id: "",
  });
  const handleSelectChange = (
    field: keyof FormData,
    value: OptionType | null
  ) => {
    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      [field]: value.value,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let filterColumns = {};
    if (!formData.start_date || !formData.end_date) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las fechas son obligatorias",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    const startDate = dayjs(formData.start_date).startOf("day");
    const endDate = dayjs(formData.end_date).startOf("day");
    if (startDate.isAfter(endDate)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "La fecha de inicio debe ser menor a la fecha de fin",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (formData.type_slug) {
      filterColumns = {
        ...filterColumns,
        type_slug: formData.type_slug,
      };
    }
    if (formData.category_id) {
      filterColumns = {
        ...filterColumns,
        category_id: formData.category_id,
      };
    }
    if (formData.start_date) {
      filterColumns = {
        ...filterColumns,
        start_date: startDate.format("YYYY-MM-DD HH:mm:ss"),
      };
    }
    if (formData.end_date) {
      filterColumns = {
        ...filterColumns,
        end_date: endDate.format("YYYY-MM-DD HH:mm:ss"),
      };
    }
    console.log(filterColumns);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
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
                onChange={(value) => handleSelectChange("type_slug", value)}
              />
            </div>
            <div className="col-md-4 col-12 form-outline form-white mb-4">
              <label htmlFor="daterange" className="form-label">
                Categoria
              </label>
              <CategorySelect
                type={"all"}
                selectOnChange={(value) =>
                  handleSelectChange("category_id", value)
                }
              />
            </div>
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
