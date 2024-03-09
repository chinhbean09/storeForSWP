// import React from "react";
// import "../styles/spinner.css";

// export default function LoadingSpinner() {
//   return (
//     <div className="spinner-container">
//       <h2 style={{ color: "red" }}>Hiện tại cửa hàng chưa có dịch vụ nào</h2>
//       <h2 style={{ color: "red" }}>Tạo thêm dịch vụ của riêng bạn </h2>
//     </div>
//   );
// }
import React from "react";
import  "../styles/spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" style={{marginLeft:"5%", marginTop:"-10%"}}>
      <div className="loading-spinner">
       
      </div>
      <h2>Loading.....</h2>
    </div>
    
  );
}
