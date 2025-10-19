import AmountLabel from "../../../components/ui/AmountLabel";
import { formatAsuncionDate } from "../../../utils/dateUtils";
import type { DetailsMovementData } from "../types/balance-operation.type";

type Props = {
  options: DetailsMovementData[];
};
function DetailMovementTable({ options }: Props) {
  return (
    <>
      <div className="card border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table card-table table-vcenter table-striped text-nowrap datatable">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nro</th>
                  <th>Categoria</th>
                  <th>Cuenta</th>
                  <th>Monto previo</th>
                  <th>Monto posterior</th>
                  <th>Monto operación</th>
                  <th>Creado el</th>
                </tr>
              </thead>
              <tbody>
                {options.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No hay movimientos
                    </td>
                  </tr>
                )}
                {options.map((option) => (
                  <tr key={option.id}>
                    <td>
                      {option.operation.type_id === 10 ? (
                        <span className="text-success text-uppercase fw-bold">
                          {option.operation.type.label}
                        </span>
                      ) : option.operation.type_id === 20 ? (
                        <span className="text-danger text-uppercase fw-bold">
                          {option.operation.type.label}
                        </span>
                      ) : (
                        <span className="text-warning text-uppercase fw-bold">
                          {option.operation.type.label}
                        </span>
                      )}
                    </td>
                    <td>{option.id}</td>
                    <td>{option.operation.category.label}</td>
                    <td>{option.account.label}</td>
                    <td className="text-end">
                      {<AmountLabel value={option.prev_acc_amount} />}
                    </td>
                    <td className="text-end">
                      {<AmountLabel value={option.next_acc_amount} />}
                    </td>
                    <td className="text-end">
                      {<AmountLabel value={option.amount} />}
                    </td>
                    <td>{formatAsuncionDate(option.created_at)}</td>
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

export default DetailMovementTable;
