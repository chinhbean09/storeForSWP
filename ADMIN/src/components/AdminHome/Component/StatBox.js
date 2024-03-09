const StatBox = ({ img, text, value, position }) => (
  <div className="col-sm-12 col-md-6 col-lg-3 mt-4">
    <div
      className="card shadow-1"
      style={{
        backgroundColor:
          position === "top" ? "rgb(138 215 222)" : "rgb(121 204 241)",
      }}
    >
      <div className="row">
        <div className="col-4">
          <div className="card shadow-2 stat-box-icon">
            <img src={img} alt={text} style={{ maxHeight: "100%" }} />
          </div>
        </div>

        <div className="col-8 text-right">
          <span className="block">{text}</span>
          <span className="block">
            <strong>{value}</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default StatBox;
