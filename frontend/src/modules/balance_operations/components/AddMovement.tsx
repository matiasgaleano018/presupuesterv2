import { useNavigate, useParams } from "react-router-dom";
import BaseLayout from "../../../pages/components/BaseLayout";
import FormMovement from "./FormMovement";
import { useEffect, useState } from "react";
import useGetMovements from "../hooks/useGetMovements";
import CardOperations from "./CardOperations";
import AmountLabel from "../../../components/ui/AmountLabel";

type movements = {
  amount: number;
  category_label: string;
  created_at: string;
  type: string;
  id: number;
};
function AddMovement() {
  const [movements, setMovements] = useState<movements[]>([]);
  const navigate = useNavigate();
  const { type } = useParams<{
    type: "income" | "expense" | "transfer" | "ajust";
  }>();
  if (!type) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    useGetMovements({})
      .then((data) =>
        setMovements(
          data.map((mov) => {
            console.log(mov);
            return {
              id: mov.id,
              amount: mov.amount,
              category_label: mov.category.label,
              created_at: mov.created_at,
              type: mov.type.label,
            };
          })
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <BaseLayout>
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title text-white fw-bold text-uppercase">
              Agregar operación
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <FormMovement type={type} />
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <h4 className="text-white fw-bold text-uppercase py-3">
                Últimos movimientos
              </h4>
              {movements.map((mov) => {
                return (
                  <div className="col-md-4 col-12" key={mov.id}>
                    <CardOperations
                      title={mov.type + " - " + mov.category_label}
                      footer={mov.created_at}
                    >
                      <div className="d-flex align-items-baseline">
                        <div className="fa-2x mb-0 me-2">
                          <AmountLabel value={mov.amount} />
                        </div>
                      </div>
                    </CardOperations>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default AddMovement;
