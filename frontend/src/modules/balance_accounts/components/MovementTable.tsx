function MovementTable() {
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
                <tr>
                  <td>
                    <i className="fas fa-plus fa-3x text-success"></i>
                  </td>
                  <td>1</td>
                  <td>Salario</td>
                  <td>$10,000</td>
                  <td>Efectivo</td>
                  <td>2022-01-01 12:00</td>
                </tr>
                <tr>
                  <td>
                    <i className="fas fa-minus fa-3x text-danger"></i>
                  </td>
                  <td>10</td>
                  <td>Salario</td>
                  <td>$10,000</td>
                  <td>Efectivo</td>
                  <td>2022-01-01 14:00</td>
                </tr>
                <tr>
                  <td>
                    <i className="fas fa-exchange-alt fa-3x text-warning"></i>
                  </td>
                  <td>24</td>
                  <td>Extraccion del cajero</td>
                  <td>$4,000</td>
                  <td>Efectivo</td>
                  <td>2022-01-01 15:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovementTable;
