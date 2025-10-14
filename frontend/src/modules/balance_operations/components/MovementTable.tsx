import { useEffect, useState } from "react";
import useGetMovements from "../hooks/useGetMovements";
import { formatAsuncionDate } from "../../../utils/dateUtils";

type categoryData = {
  id: number;
  slug: string;
  label: string;
  type_id: number;
  user_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};

type AccountData = {
  id: number;
  type_id: number;
  label: string;
  user_id: number;
  amount: number;
  number: string;
  status: number;
  description: string;
  created_at: string;
  updated_at: string;
};

type detailData = {
  id: number;
  account_id: number;
  account: AccountData;
  amount: number;
  next_acc_amount: number;
  prev_acc_amount: number;
  operation_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};
type movementsData = {
  id: number;
  type_id: number;
  user_id: number;
  category_id: number;
  amount: number;
  category: categoryData;
  details: detailData[];
  status: number;
  created_at: string;
  updated_at: string;
};

function MovementTable() {
  const [movements, setMovements] = useState<movementsData[]>([]);

  useEffect(() => {
    useGetMovements({ params: { limit: 5 } })
      .then((data) => setMovements(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="card border-0">
        <div className="card-header border-0">
          <h3 className="card-title text-white fw-bold text-uppercase">
            Ultimos movimientos
          </h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nro</th>
                  <th>Categoria</th>
                  <th>Monto</th>
                  <th>Cuenta</th>
                  <th>Creado el</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id}>
                    <td>
                      {movement.type_id === 10 ? (
                        <i className="fas fa-plus fa-3x text-success"></i>
                      ) : movement.type_id === 20 ? (
                        <i className="fas fa-minus fa-3x text-danger"></i>
                      ) : (
                        <i className="fas fa-exchange-alt fa-3x text-warning"></i>
                      )}
                    </td>
                    <td>{movement.id}</td>
                    <td>{movement.category.label}</td>
                    <td>{movement.amount}</td>
                    <td>{movement.details[0].account.label}</td>
                    <td>{formatAsuncionDate(movement.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovementTable;
