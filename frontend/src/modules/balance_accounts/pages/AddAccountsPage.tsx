import BaseLayout from "../../../pages/components/BaseLayout";
import FormAccounts from "../components/FormAccounts";

function AddAccountsPage() {
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Agregar cuenta
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <FormAccounts />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default AddAccountsPage;
