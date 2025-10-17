import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useToSlug from "../../../components/hooks/useToSlug";
import Swal from "sweetalert2";
import useGetCategoryById from "../hooks/useGetByCategoryById";
import usePutCategories from "../hooks/usePutCategories";
import Alert from "../../../components/ui/Alert";

type FormData = {
  slug: string;
  label: string;
  is_active: boolean;
};

type Props = {
  categoryId: number;
};

function FormEditCategory({ categoryId }: Props) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    slug: "",
    label: "",
    is_active: true,
  });

  useEffect(() => {
    useGetCategoryById(categoryId)
      .then((data) =>
        setFormData({
          slug: data.slug,
          label: data.label,
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
    console.log(name, checked);
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
        slug: useToSlug(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await usePutCategories({
        id: categoryId,
        body: {
          label: formData.label,
          slug: useToSlug(formData.label),
          is_active: formData.is_active,
        },
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Categoria actualizada",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/categories");
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Error desconocido";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
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
              placeholder="Agregue una etiqueta"
              name="label"
              required
              onChange={handleChange}
              value={formData.label}
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="label" className="form-label">
              Slug
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="label"
              required
              readOnly
              value={formData.slug}
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
                menssage="Al deshabilitar una categoria ya no pedra ser seleccionada al agregar una operación"
              />
            </div>
          </div>
          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/categories">
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

export default FormEditCategory;
