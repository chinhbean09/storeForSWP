import React from "react";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Your order",
    path: "/",
    icon: <MdIcons.MdLocalShipping />,
  },
  {
    title: "Awaiting pickup",
    path: "/pendingOrders",
    icon: <MdIcons.MdPendingActions />,
  },
];
