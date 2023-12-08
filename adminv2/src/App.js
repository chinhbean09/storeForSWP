import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import Order from "./components/OrderList/Order";
import Store from "./components/StoreList/Store";
import User from "./components/UserList/User";
import Home from "./components/AdminHome/Home";
import StoreManager from "./components/StoreList/StoreManager";
import UserProfile from "./components/UserList/UserProfile/UserProfile";
import StoreProfile from "./components/StoreList/StoreProfile";
import OrderDetails from "./components/OrderList/OrderDetail";
import StoreBio from "./components/StoreList/StoreBio";
import StoreService from "./components/StoreList/StoreService";
import { AppProvider } from "./ContextProvider";
import Login from "./components/Login";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfoDTO } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Sidebar />}>
            <Route path="home" element={<Home />} />
            <Route path="order" element={<Order />} />
            <Route path="store">
              <Route path="" element={<Store />} />
              <Route path="storemanager" element={<StoreManager />} />
            </Route>
            <Route path="user" element={<User />} />

            {/* <Route path="tagManagement" element={<TagManagement />} /> */}
            <Route path="user/:id" element={<UserProfile />} />

            <Route path="store/:id" element={<StoreProfile />}>
              <Route path="bio" element={<StoreBio />} />
              <Route path="service" element={<StoreService />} />
            </Route>

            <Route path="OrderDetails/:id" element={<OrderDetails />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
