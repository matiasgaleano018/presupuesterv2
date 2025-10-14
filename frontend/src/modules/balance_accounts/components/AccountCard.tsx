import AmountLabel from "../../../components/ui/AmountLabel";

type Props = {
  type_label: string;
  account_number: string;
  amount: number;
  children?: React.ReactNode;
};

function AccountCard({ type_label, account_number, amount, children }: Props) {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="subheader">
                {type_label} Nro {account_number}
              </div>
            </div>
            <div className="d-flex align-items-baseline">
              <div className="fa-2x mb-0 me-2">
                <AmountLabel value={amount} />
              </div>
            </div>
            {children}
          </div>
          <div id="chart-revenue-bg" className="chart-sm"></div>
        </div>
      </div>
    </>
  );
}

export default AccountCard;
