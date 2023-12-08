import React, { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Spin } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";

function StaffHome() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchShippingOrder = async () => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/base/staff/shipping-order",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        const ordersWithStatus3OrAbove = response.data.filter(
          (order) => order.status !== 2
        );
        setOrders(ordersWithStatus3OrAbove);
      })
      .catch((error) => {
        console.error(error);
        setError("Error");
      });
  };

  React.useEffect(() => {
    // Call the function once when the component mounts
    fetchShippingOrder();
    const interval = setInterval(() => {
      fetchShippingOrder();
    }, 1500); // Changed to 2 seconds as per your requirement
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);
  const statusMap = {
    0: "Canceled",
    1: "Awaiting confirmation",
    2: "Awaiting pickup",
    3: "Transporting to store",
    4: "Processing by store",
    5: "Order ready for delivery",
    6: "Order being delivered",
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

  const columns = [
    {
      title: "ID",
      dataIndex: "orderCode",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      sorter: (b, a) => {
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
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Store Name",
      dataIndex: "storename",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Total Price",
      dataIndex: "total",

      render: (text, record) => record.formattedTotal,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShippingOrder().finally(() => setLoading(false));
  }, []);

  const data1 = [];

  for (let i = 0; i < orders.length; i++) {
    // Format the total value as needed
    let formattedTotal =
      new Intl.NumberFormat("en-US").format(orders[i].total) + "$";

    data1.push({
      orderCode: orders[i].orderCode,
      date: orders[i].orderDate,
      storename: orders[i].store.name,
      username: orders[i].user.fullName,
      status: (
        <Tag color={colorMap[orders[i].status]}>
          {statusMap[orders[i].status]}
        </Tag>
      ),
      total: orders[i].total,
      formattedTotal: formattedTotal, // Add the formatted total value

      action: (
        <>
          <Link to={`${orders[i].id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
        </>
      ),
    });
  }

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
            Cannot find any orders
          </h2>
        </div>
      ) : loading ? (
        <Spin style={{ marginTop: "15px" }} tip="Fetching data..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <h3 className="mb-4 title">Your order</h3>

          <div>
            <Table columns={columns} dataSource={data1.reverse()} />
          </div>
        </div>
      )}
    </>
  );
}

export default StaffHome;
