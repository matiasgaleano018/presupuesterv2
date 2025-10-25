function CardLoader() {
    return (
        <div className="col-md-4 col-12">
            <div className="container">
                <div className="card">
                    <h4 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h4>
                    <div className="card-body">
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <div className="d-flex justify-content-end">
                            <a
                            href="#"
                            tabIndex={-1}
                            className="btn btn-primary disabled placeholder col-3"
                            ></a>
                        </div>
                    </div>
                    <div id="chart-revenue-bg" className="chart-sm"></div>
                </div>
            </div>
        </div>
    );
}

export default CardLoader;