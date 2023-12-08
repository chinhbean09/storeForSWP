// LoadingSpinner component

import React, { useState, useEffect } from "react";
import "../styles/spinner.css";

export default function LoadingSpinner({ isSuccess }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      // Delay showing the spinner for 4 seconds
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className={`spinner-container ${showSpinner ? "show-spinner" : ""}`}>
      <h2 style={{ color: "red" }}>Hiện tại cửa hàng chưa có dịch vụ nào</h2>
      <h2 style={{ color: "red" }}>Hãy tạo cửa hàng trước khi tạo dịch vụ</h2>
      {showSpinner && <div className="spinner"></div>}
    </div>
  );
}
