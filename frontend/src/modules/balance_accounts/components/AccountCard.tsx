function AccountCard() {
  return (
    <>
      <div className="container h-50">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <div className="subheader">Efectivo</div>
            </div>
            <div className="d-flex align-items-baseline">
              <div className="fa-3x mb-0 me-2">$4,300</div>
              <div className="me-auto">
                <span className="text-green d-inline-flex align-items-center lh-1">
                  8%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon ms-1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17l6 -6l4 4l8 -8" />
                    <path d="M14 7l7 0l0 7" />
                  </svg>
                </span>
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
