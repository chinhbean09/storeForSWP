import React from "react";
import "../styles/spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" style={{marginLeft:"45%", marginTop:"10%"}}>
      <div className="loading-spinner">
       
      </div>
      <h2>Đang tải.....</h2>
    </div>
    
  );
}