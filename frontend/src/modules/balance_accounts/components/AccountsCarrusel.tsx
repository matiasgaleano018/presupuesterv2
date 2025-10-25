import { useEffect, useState } from "react";
import AccountCard from "./AccountCard";
import Swal from "sweetalert2";
import useGetAccounts from "../hooks/useGetAccounts";

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
function AccountsCarrusel() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<ResponseData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    useGetAccounts({ params: { status_active: true } })
      .then((data) => setAccounts(data))
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="card py-4 border-0">
        <div className="card-header border-0">
          <h3 className="card-title text-white fw-bold">CUENTAS</h3>
        </div>
        <div className="card-body">
          <div
            id="carousel-controls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="container" style={{ width: "85%" }}>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    {isLoading && (
                      <div className="d-flex justify-content-center my-3">
                        <span className="loader-box"></span>
                      </div>
                    )}
                    {accounts.map((account) => (
                      <div className="carousel-item active" key={account.id}>
                        <AccountCard
                          type_label={account.label}
                          account_number={account.number}
                          amount={account.amount}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel-controls"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Anterior</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel-controls"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Siguiente</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountsCarrusel;
