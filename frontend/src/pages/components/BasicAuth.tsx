import "../LoginPage.css";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

function BasicAuth({ title, subtitle, children }: Props) {
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white card-border">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <div className="container">
                      <img src="/logo.png" alt="logo" />
                    </div>
                    <h2 className="fw-bold mb-2 text-uppercase">{title}</h2>
                    <p className="text-white-50 mb-5">{subtitle}</p>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BasicAuth;
