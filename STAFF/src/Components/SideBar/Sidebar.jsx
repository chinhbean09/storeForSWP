import React, { useState } from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="container1">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            src="https://res.cloudinary.com/df6mibrwv/image/upload/v1698172847/xeasuevjyadfgzuj25jx.png"
            style={{
              display: isOpen ? "block" : "none",
              margin: "-10px 5px -20px 30px",
              width: "60%",
              height: "auto",
            }}
            className="logo"
          />
          <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {SidebarData.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
