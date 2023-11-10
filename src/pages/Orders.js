import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { } from "../features/auth/authSlice";
import { config } from "../utils/axiosconfig";

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/order/all";

const columns = [
  {
    title: "Mã Đặt Hàng",
    dataIndex: "key",
  },
  {
    title: "Ngày Đặt Hàng",
    dataIndex: "date",
    sorter: (a, b) => a.name.length - b.title.name,
  },
  {
    title: "Tên Cửa Hàng",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.title.name,
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",

  },
  {
    title: "Tổng Giá",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: "Hành Động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const { userInfoDTO } = useSelector((state) => state.auth);

  const [state, setState] = useState([]);

  useEffect(() => {
    getHistoryOrders(userInfoDTO.id);
  }, []);

  const getHistoryOrders = async (id) => {
    const res = await axios.get(`${URL}/${id}`,config);
    if (res.status === 200) {
      setState(res.data);
    }
  }

  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < state.length; i++) {
    data1.push({
      key: state[i].id,
      date: state[i].orderDate,
      name: state[i].store.name,
      status: state[i].status,
      total: state[i].total,
      
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
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
