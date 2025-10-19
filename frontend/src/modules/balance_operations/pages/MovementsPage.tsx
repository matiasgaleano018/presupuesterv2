import BaseLayout from "../../../pages/components/BaseLayout";
import FormMovementFilter from "../components/FormMovementFilter";

function MovementsPage() {
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Movimientos
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <FormMovementFilter />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default MovementsPage;
