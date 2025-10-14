import { useEffect, useState } from "react";
import BaseLayout from "../../../pages/components/BaseLayout";
import useGetAccounts from "../hooks/useGetAccounts";
import Swal from "sweetalert2";
import AccountCard from "../components/AccountCard";
import { formatAsuncionDate } from "../../../utils/dateUtils";
import { Link } from "react-router-dom";

type AccType = {
  id: number;
  label: string;
  slug: string;
  status: number;
  created_at: Date;
  updated_at: Date;
};
type ResponseData = {
  id: number;
  type_id: number;
  label: string;
  user_id: number;
  amount: number;
  number: string;
  status: number;
  description: string;
  type: AccType;
  created_at: Date;
  updated_at: Date;
};
function AccountsPage() {
  const [accounts, setAccounts] = useState<ResponseData[]>([]);

  useEffect(() => {
    useGetAccounts()
      .then((data) => setAccounts(data))
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Cuentas
            </h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <Link
                to="/accounts/new"
                className="btn btn-primary btn-lg px-5 mx-1 my-2"
              >
                <i className="fas fa-plus px-1"></i> Crear cuenta
              </Link>
            </div>
            <div className="table-responsive mb-4">
              <div className="row">
                {accounts.map((account) => (
                  <div className="col-md-4 col-12" key={account.id}>
                    <AccountCard
                      key={account.id}
                      type_label={account.type.label}
                      account_number={account.number}
                      amount={account.amount}
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="text-muted">
                            Creado el: {formatAsuncionDate(account.created_at)}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="text-muted">
                            Actualizado el:{" "}
                            {formatAsuncionDate(account.updated_at)}
                          </div>
                        </div>
                      </div>
                    </AccountCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default AccountsPage;
