import { useParams } from "react-router-dom";
import BaseLayout from "../../../pages/components/BaseLayout";
import FormAccounts from "../components/FormAccounts";
import FormEditAccounts from "../components/FormEditAccounts";

function AddAccountsPage() {
  const { accountId } = useParams<{
    accountId: string;
  }>();
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              {accountId ? "Editar" : "Agregar"} cuenta
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {accountId ? (
                <FormEditAccounts accountId={Number(accountId)} />
              ) : (
                <FormAccounts />
              )}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default AddAccountsPage;
