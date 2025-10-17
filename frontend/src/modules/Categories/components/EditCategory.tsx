import { useParams } from "react-router-dom";
import BaseLayout from "../../../pages/components/BaseLayout";
import FormEditCategory from "./FormEditCategory";

function EditCategory() {
  const { id } = useParams<{
    id: string;
  }>();
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Editar categoria
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <FormEditCategory categoryId={Number(id)} />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default EditCategory;
