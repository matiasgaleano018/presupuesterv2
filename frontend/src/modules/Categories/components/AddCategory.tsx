import BaseLayout from "../../../pages/components/BaseLayout";
import FormCategory from "./FormCategory";

function AddCategory() {
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Agregar categoria
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <FormCategory />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default AddCategory;
