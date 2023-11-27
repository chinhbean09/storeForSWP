import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const {userInfoDTO} = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  console.log("Main Layout" + JSON.parse(localStorage.getItem("access_token")));
  return (
    
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link to="/" style={{fontSize:'26px', textDecoration: 'none'}}>
          <h2 className="text-white text-center py-3 mb-0">
            <span className="sm-logo">Store</span>
            <span className="lg-logo">The laundry</span>
          </h2>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "design-store",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Store Customized",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Manage Services",
              children: [
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Dry Cleaning",
                },
                {
                  key: "laundry",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Laundry",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "manage-time",
              icon: <FaClipboardList className="fs-4" />,
              label: "Laundry Time Package  ",
            },
          ]}
        />
      </Sider>



      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative"  >
              {/* <IoIosNotifications className="fs-4" style={{ width: '30px' }}/>
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span> */}
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{userInfoDTO.email}</h5>
                <p className="mb-0">{userInfoDTO.fullName}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                    onClick={() => dispatch(logout())}
                  > LogOut
                   {/* <a href=`${base_url}/auth/logout`> Logout </a>  */}

                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
