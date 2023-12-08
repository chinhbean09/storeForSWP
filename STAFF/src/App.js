import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffHome from "./Components/AcceptedOrder";
import OrderDetails from "./Components/OrderDetail";
import { OrderProvider } from "./ContextProvider";
import Sidebar from "./Components/SideBar/Sidebar";
import PendingOrders from "./Components/PendingOrder";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <OrderProvider>
          {" "}
          <Routes>
            <Route path="/" element={<StaffHome />} />
            <Route path="/pendingOrders" element={<PendingOrders />} />
            <Route path=":id" element={<OrderDetails />} />
            <Route path="/pendingOrders/:id" element={<OrderDetails />} />
          </Routes>
        </OrderProvider>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
