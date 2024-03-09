import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
// import { config } from "../axios/auth-header";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Tag } from "antd";

const URL = "http://localhost:8001/api/v1/user/order/all";

const columns = [
  {
    title: "No",
    dataIndex: "orderCode",
  },
  {
    title: "Booking date",
    dataIndex: "date",
    sorter: (a, b) => {
      const dateA = Date.parse(
        a.date.split(" ")[0].split("-").reverse().join("-") +
          "T" +
          a.date.split(" ")[1]
      );
      const dateB = Date.parse(
        b.date.split(" ")[0].split("-").reverse().join("-") +
          "T" +
          b.date.split(" ")[1]
      );
      return dateA - dateB;
    },
  },
  {
    title: "Store name",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Total",
    dataIndex: "total",

    render: (text, record) => record.formattedTotal,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const statusMap = {
  0: "Canceled",
  1: "Awaiting confirmation",
  2: "Awaiting pickup from customer",
  3: "Transporting to store",
  4: "Processing by store",
  5: "Order ready for delivery",
  6: "Order being delivered to customer",
  7: "Order completed",
};

const colorMap = {
  0: "red",
  1: "gold",
  2: "lime",
  3: "cyan",
  4: "blue",
  5: "geekblue",
  6: "purple",
  7: "green",
};

const HistoryOrders = () => {
  const { userInfoDTO } = useSelector((state) => state.auth);
  const [state, setState] = useState([]);
  const [error, setError] = useState("");

  const getHistoryOrders = async (id) => {
    const res = await axios
      .get(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        setState(res.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.toJSON().message);
      });
  };

  useEffect(() => {
    // Call the function once when the component mounts
    getHistoryOrders(userInfoDTO.id);

    const interval = setInterval(() => {
      getHistoryOrders(userInfoDTO.id);
    }, 2000); // Changed to 2 seconds as per your requirement

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const data1 = [];

  for (let i = 0; i < state.length; i++) {
    // Format the total value as needed
    let formattedTotal =
      new Intl.NumberFormat("en-US").format(state[i].total) + "USD";

    data1.push({
      orderCode: state[i].orderCode,
      date: state[i].orderDate,
      name: state[i].store.name,
      status: (
        <Tag color={colorMap[state[i].status]}>
          {statusMap[state[i].status]}
        </Tag>
      ),
      total: state[i].total,
      formattedTotal: formattedTotal, // Add the formatted total value

      action: (
        <>
          <Link to={`${state[i].id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
        </>
      ),
    });
  }

  console.log(data1);
  return (
    <>
      {error.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: " center",
            height: " 50vh",
          }}
        >
          <h2 style={{ color: "#6c757d", fontFamily: "Arial, sans-serif" }}>
          No orders found
          </h2>
        </div>
      ) : data1.length === 0 ? (
        <Spin
          style={{ marginTop: "15px" }}
          tip="Fetching data..."
          size="large"
        >
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <h3 className="mb-4 title">Order History</h3>

          <div>
            <Table columns={columns} dataSource={data1.reverse()} />
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryOrders;
