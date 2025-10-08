type Props = {
  type_label: string;
  account_number: string;
  amount: number;
};

function AccountCard({ type_label, account_number, amount }: Props) {
  return (
    <>
      <div className="container h-50">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="subheader">
                {type_label} Nro {account_number}
              </div>
            </div>
            <div className="d-flex align-items-baseline">
              <div className="fa-3x mb-0 me-2">
                <span className="fs-1">Gs.</span> {amount}
              </div>
            </div>
          </div>
          <div id="chart-revenue-bg" className="chart-sm"></div>
        </div>
      </div>
    </>
  );
}

export default AccountCard;
