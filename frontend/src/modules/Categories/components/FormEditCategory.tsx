import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useToSlug from "../../../components/hooks/useToSlug";
import Swal from "sweetalert2";
import useGetCategoryById from "../hooks/useGetByCategoryById";

type FormData = {
  slug: string;
  label: string;
  is_active: boolean;
};

type Props = {
  categoryId: number;
};

function FormEditCategory({ categoryId }: Props) {
  //const navigate = useNavigate();

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
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      slug: useToSlug(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   await usePostCategories({
    //     body: {
    //       type_slug: formData.type_slug,
    //       label: formData.label,
    //       slug: useToSlug(formData.label),
    //     },
    //   });

    //   Swal.fire({
    //     title: "Categoria creada",
    //     text: "¿Desas agregar otra?",
    //     icon: "success",
    //     showCancelButton: true,
    //     confirmButtonColor: "#2FB344",
    //     cancelButtonColor: "#9CA3AF",
    //     confirmButtonText: "Agregar otro",
    //     cancelButtonText: "Ir al inicio",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location.reload();
    //     } else {
    //       navigate("/");
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "error",
    //     title: "Error al crear la categoria",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
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
          </div>
          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/categories">
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

export default FormEditCategory;
