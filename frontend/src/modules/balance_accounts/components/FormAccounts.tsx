import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useGetAccountsTypes from "../hooks/useGetAccountsTypes";
import SelectSimple from "../../../components/ui/SelectSimple";
import usePostAccounts from "../hooks/usePostAccounts";

type OptionType = {
  value: string | number;
  label: string;
};

type formData = {
  type_id: number;
  label: string;
  number: string;
};

type AccType = {
  id: number;
  label: string;
  slug: string;
  status: number;
  created_at: Date;
  updated_at: Date;
};
function FormAccounts() {
  const navigate = useNavigate();

  const [options, setOptions] = useState<OptionType[]>([]);
  useEffect(() => {
    useGetAccountsTypes()
      .then((data) =>
        setOptions(
          data.map((account: AccType) => {
            return {
              value: account.id,
              label: account.label + " (" + account.slug + ")",
            };
          })
        )
      )
      .catch((error) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.type_id === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes seleccionar un tipo de cuenta",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await usePostAccounts({ body: formData });
      Swal.fire({
        title: "Cuenta creada",
        text: "¿Desas agregar otra cuenta?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#2FB344",
        cancelButtonColor: "#9CA3AF",
        confirmButtonText: "Agregar otro",
        cancelButtonText: "Ir al inicio",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al crear la cuenta",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="form-outline form-white mb-4">
            <label htmlFor="typeOp" className="form-label">
              Tipo de cuenta
            </label>
            <SelectSimple
              options={options}
              onChange={handleSelectChange}
              name="type_id"
              placeholder="Seleccione una cuenta"
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="label" className="form-label">
              Etiqueta
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Ej: Cuenta de ahorro - Banco X"
              name="label"
              required
              onChange={handleChange}
              value={formData.label}
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="label" className="form-label">
              Número de cuenta
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Agregue el número de cuenta"
              name="number"
              required
              onChange={handleChange}
              value={formData.number}
            />
          </div>
          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/accounts">
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
