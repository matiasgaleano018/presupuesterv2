import { useEffect, useState } from "react";
import useGetMovements from "../hooks/useGetMovements";
import { formatAsuncionDate } from "../../../utils/dateUtils";
import type { BalanceOperation } from "../types/balance-operation.type";
import AmountLabel from "../../../components/ui/AmountLabel";

function LastMovementTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [movements, setMovements] = useState<BalanceOperation[]>([]);

  useEffect(() => {
    setIsLoading(true);
    useGetMovements({ params: { limit: 5 } })
      .then((data) => setMovements(data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
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
                {isLoading && (
                    <tr>
                    <td colSpan={6} className="text-center py-5">
                        <span className="loader-box"></span>
                    </td>
                  </tr>
                )}
                {movements.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No hay movimientos
                    </td>
                  </tr>
                )}
                {movements.map((movement) => (
                  <tr key={movement.id}>
                    <td>
                      {movement.type_id === 10 ? (
                        <span className="text-success text-uppercase fw-bold">
                          {movement.type.label}
                        </span>
                      ) : movement.type_id === 20 ? (
                        <span className="text-danger text-uppercase fw-bold">
                          {movement.type.label}
                        </span>
                      ) : (
                        <span className="text-warning text-uppercase fw-bold">
                          {movement.type.label}
                        </span>
                      )}
                    </td>
                    <td>{movement.id}</td>
                    <td>{movement.category.label}</td>
                    <td className="text-end">
                      {<AmountLabel value={movement.amount} />}
                    </td>
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

export default LastMovementTable;
