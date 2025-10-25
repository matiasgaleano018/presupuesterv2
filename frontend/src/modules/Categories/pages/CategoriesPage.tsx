import { Link } from "react-router-dom";
import BaseLayout from "../../../pages/components/BaseLayout";
import { useEffect, useState } from "react";
import useGetAllCategories from "../hooks/useGetAllCategories";
import SimpleCard from "../../../components/ui/SimpleCard";
import { formatAsuncionDate } from "../../../utils/dateUtils";
import CardLoader from "../../../components/ui/CardLoader";

type categoryType = {
  id: number;
  label: string;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
};
type categoryData = {
  id: number;
  label: string;
  slug: string;
  status: number;
  type_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  type: categoryType;
};

type category = {
  id: number;
  label: string;
  slug: string;
  type_label: string;
  type_slug: string;
  status: number;
  created_at: string;
  updated_at: string;
};
function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<category[]>();
  useEffect(() => {
    setIsLoading(true);
    useGetAllCategories()
      .then((data) =>
        setCategories(
          data.map((category: categoryData) => {
            return {
              id: category.id,
              label: category.label,
              slug: category.slug,
              type_label: category.type.label,
              type_slug: category.type.slug,
              status: category.status,
              created_at: category.created_at,
              updated_at: category.updated_at,
            };
          })
        )
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Categorias (de movimientos)
            </h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <Link
                to="/categories/new"
                className="btn btn-primary btn-lg px-5 mx-1 my-2"
              >
                <i className="fas fa-plus px-1"></i> Crear categoria
              </Link>
            </div>
            <div className="table-responsive mb-4">
              <div className="row w-100">
                {isLoading && 
                  <CardLoader />
                }
                {categories?.map((category) => {
                  let textColor =
                    category.type_slug === "expense"
                      ? "text-danger"
                      : category.type_slug === "income"
                      ? "text-success"
                      : "text-warning";
                  return (
                    <div className="col-md-4 col-12 mb-2" key={category.id}>
                      <SimpleCard title={""} text={category.label}>
                        <div className="row">
                          <div className="col-12">
                            <div className="text-muted">
                              Tipo:{" "}
                              <span className={`${textColor}`}>
                                {category.type_label}
                              </span>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="text-muted">
                              Estado:{" "}
                              {category.status === 100 ? "Activo" : "Inactivo"}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="text-muted">
                              Creado el:{" "}
                              {formatAsuncionDate(category.created_at)}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="text-muted">
                              Actualizado el:{" "}
                              {formatAsuncionDate(category.updated_at)}
                            </div>
                          </div>
                          <div className="col-12 text-end">
                            <Link
                              to={`/categories/${category.id}/edit`}
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="fas fa-edit px-1"></i> Editar
                            </Link>
                          </div>
                        </div>
                      </SimpleCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default CategoriesPage;
