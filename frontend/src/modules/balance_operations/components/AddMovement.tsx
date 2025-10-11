import { useNavigate, useParams } from "react-router-dom";
import BaseLayout from "../../../pages/components/BaseLayout";
import FormMovement from "./FormMovement";

function AddMovement() {
  const navigate = useNavigate();
  const { type } = useParams<{
    type: "income" | "expense" | "transfer" | "ajust";
  }>();
  if (!type) {
    navigate("/");
    return null;
  }
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
        </div>
      </BaseLayout>
    </>
  );
}

export default AddMovement;
