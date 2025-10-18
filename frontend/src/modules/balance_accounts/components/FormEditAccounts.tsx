import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "../../../components/ui/Alert";
import useGetAccountById from "../hooks/useGetAccountById";
import usePutAccount from "../hooks/usePutAccount";

type formData = {
  label: string;
  number: string;
  is_active: boolean;
};

type Props = {
  accountId: number;
};

function FormEditAccounts({ accountId }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState<formData>({
    label: "",
    number: "",
    is_active: true,
  });

  useEffect(() => {
    useGetAccountById(accountId)
      .then((data) =>
        setFormData({
          label: data.label,
          number: data.number,
          is_active: data.status === 100 ? true : false,
        })
      )
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener la información",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "is_active") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
      setShowAlert(!checked);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await usePutAccount({ accountId, body: formData });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cuenta actualizada",
        showConfirmButton: false,
        timer: 1500,
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
          <div className="form-outline form-white mb-4">
            <label htmlFor="label" className="form-label">
              Habilitada
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              name="is_active"
              onChange={handleChange}
              checked={formData.is_active}
            />
            <div className={`py-2 ${showAlert ? "d-block" : "d-none"}`}>
              <Alert
                type="warning"
                menssage="Al deshabilitar una cuenta ya no pedra ser seleccionada al agregar una operación"
              />
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/accounts">
              <i className="fas fa-arrow-left px-1"></i> Volver
            </Link>
            <button className="btn btn-primary btn-lg px-5 ms-3" type="submit">
              <i className="fas fa-save px-1"></i> Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormEditAccounts;
