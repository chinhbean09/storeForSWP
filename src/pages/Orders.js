import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import {FaMotorcycle  } from 'react-icons/fa';
import { GiWashingMachine } from 'react-icons/gi';
import { MdOutlineDoneOutline } from 'react-icons/md';
import axios from 'axios';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "User Name",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = (order) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const handleIconClick = (id) => {
    const newStatus = "done";
    axios
      .patch(`http://localhost:3000/order/${id}`, {
        status: newStatus,
      })
      .then((response) => {
        console.log(response.data);
        setOrders((prevStores) =>
          prevStores.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const orderState = useSelector((state) => state.auth.orders);
  const [orders,setOrders]=useState(orderState);

  const data1 = [];
  for (let i = 0; i < orders.length; i++) {
    data1.push({
      key: i + 1,
      name: orders[i].orderby.username,
      action: (
        <>
        <Link to={`/admin/order/${orders[i].orderby.id}`}>
          <button>View Orders</button>
        </Link>
        <MdOutlineDoneOutline onClick={handleIconClick(order.id)}/>
</>
      ),
      status: (
        <>
        if(${orders[i].orderby.status == 'washing'}){
        <GiWashingMachine />
      }if(${orders[i].orderby.status == 'done'}){
        <FaMotorcycle />
      }
      </>
      ),
      date: new Date(orders[i].createdAt).toLocaleString(),
      price: (
        orders[i].orderby.price
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
