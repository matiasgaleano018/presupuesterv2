import { Link } from "react-router-dom";

type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};
type Props = {
  userData: UserData;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};
function FormUser({ userData, onChange, onSubmit }: Props) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-outline form-white mb-4">
                <label htmlFor="first_name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Agregue una etiqueta"
                  name="first_name"
                  required
                  value={userData?.first_name}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-outline form-white mb-4">
                <label htmlFor="last_name" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Agregue una etiqueta"
                  name="last_name"
                  required
                  value={userData?.last_name}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="label" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Agregue una etiqueta"
              name="email"
              required
              value={userData?.email}
              onChange={onChange}
            />
          </div>
          <div className="d-flex justify-content-start">
            <Link className="btn btn-secondary btn-lg px-5" to="/home">
              <i className="fas fa-arrow-left px-1"></i> Volver
            </Link>
            <button className="btn btn-primary btn-lg px-5 ms-3" type="submit">
              <i className="fas fa-save px-1"></i> Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormUser;
