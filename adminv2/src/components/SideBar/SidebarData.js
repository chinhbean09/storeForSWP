import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
export const SidebarData = [
  {
    title: "Home",
    path: "/admin/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "User mangement",
    path: "/admin/user",
    icon: <BiIcons.BiUser />,
    cName: "nav-text",
  },
  {
    title: "Store management",
    path: "/admin/store",
    icon: <AiIcons.AiFillShop />,
    cName: "nav-text",
  },
  // {
  //   title: "Quản lý đơn hàng",
  //   path: "/admin/order",
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Quản lý thẻ",
  //   path: "/admin/tagManagement",
  //   icon: <AiFillTag />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Logout",
  //   path: "/admin/logout",
  //   icon: <BiIcons.BiLogOut />,
  //   cName: "logout",
  // },
];
