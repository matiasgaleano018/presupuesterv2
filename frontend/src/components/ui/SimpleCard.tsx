type Props = {
  children: React.ReactNode;
  title: string;
  text: string;
};
function SimpleCard({ title, text, children }: Props) {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="subheader">{title}</div>
            </div>
            <div className="d-flex align-items-baseline">
              <div className="mb-0 me-2 fs-2">{text}</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default SimpleCard;
