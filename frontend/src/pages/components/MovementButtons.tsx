import { useNavigate } from "react-router-dom";

function MovementButtons() {
  const navigate = useNavigate();
  const handleClick = (type: "income" | "expense" | "transfer") => {
    navigate(`/operations/${type}`);
  };

  return (
    <>
      <div className="card border-0">
        <div className="card-header border-0">
          <h3 className="card-title text-white fw-bold">AGREGAR MOVIMIENTOS</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <button
                onClick={() => handleClick("income")}
                className="btn btn-outline-light d-flex flex-column align-items-center justify-content-center shadow"
                style={{
                  width: "100%",
                  height: "120px",
                  boxShadow: "0 4px 10px rgba(255,255,255,0.6)",
                }}
              >
                <i className="fas fa-money-check-alt fa-4x mb-2"></i>
                <span className="fw-bold">Ingreso</span>
              </button>
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <button
                onClick={() => handleClick("expense")}
                className="btn btn-outline-light d-flex flex-column align-items-center justify-content-center shadow"
                style={{
                  width: "100%",
                  height: "120px",
                  boxShadow: "0 4px 10px rgba(255,255,255,0.6)",
                }}
              >
                <i className="fas fa-receipt fa-4x mb-2"></i>
                <span className="fw-bold">Egreso</span>
              </button>
            </div>
            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
              <button
                onClick={() => handleClick("transfer")}
                className="btn btn-outline-light d-flex flex-column align-items-center justify-content-center shadow"
                style={{
                  width: "100%",
                  height: "120px",
                  boxShadow: "0 4px 10px rgba(255,255,255,0.6)",
                }}
              >
                <i className="fas fa-exchange-alt fa-4x mb-2"></i>
                <span className="fw-bold">Transferencia</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovementButtons;
