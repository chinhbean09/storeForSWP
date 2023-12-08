import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import "./OrderDetail.css";
import { Button, Timeline } from "antd";
import axios from "axios";
import { Spin, Tag } from "antd";
import { BackButton } from "./BackButton/BackButton";
import { useEffect } from "react";
import { CheckCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

export default function OrderDetails() {
  let { id } = useParams();
  id = Number(id);
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState([]);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    axios
      .get(`https://magpie-aware-lark.ngrok-free.app/api/v1/base/order/${id}`, {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setOrder(response.data);
        const sortedItems = response.data.items.sort((a, b) => a.id - b.id);
        setItem(sortedItems);
      })
      .catch((error) => {
        console.error(error);
        setError(error.toJSON().message);
      });
  };

  useEffect(() => {
    // Call the function once when the component mounts
    fetchOrder();
    const interval = setInterval(() => {
      fetchOrder();
    }, 1500); // Changed to 2 seconds as per your requirement
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = async () => {
    try {
      const newStatus = order?.status + 1;
      const response = await axios.put(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/order/update/${id}?status=${newStatus}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        },
        {
          status: newStatus,
        }
      );
      if (response.status === 200) {
        setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error(
        "An error occurred while updating the order status:",
        error
      );
    }
  };

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
  const buttonMap = {
    1: "Confirm",
    2: "Picked up",
    3: "Transported to store",
    4: "Processed by store",
    5: "Received order from store",
    6: "Order delivered",
  };

  let statusArray = [];
  for (let i = 1; i < order.status; i++) {
    statusArray.push({ children: statusMap[i] });
  }
  if (order?.status === 7) {
    statusArray.push({ children: statusMap[order.status] });
  }
  let pendingStatus = statusMap[order.status];
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
            Cannot access!
          </h2>
        </div>
      ) : order.length === 0 ? (
        <Spin style={{ marginTop: "60px" }} tip="Fetching data..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <section className="h-100 h-custom">
          <BackButton
            Root={order.status > 2 ? "" : "pendingOrders"}
          ></BackButton>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="8" xl="6">
                <MDBCard className="border-3 border-color-custom MDBCard">
                  <MDBCardBody className="p-5">
                    <p
                      className="lead fw-bold mb-5 "
                      style={{ color: "#f37a27", fontSize: "30px" }}
                    >
                      Order Details
                    </p>
                    <MDBRow>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Customer Name</p>
                        <p>{order.user.fullName}</p>
                      </MDBCol>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">ID</p>
                        <p>{order.orderCode}</p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Store Name</p>
                        <p>{order.store.name}</p>
                      </MDBCol>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Order Date</p>
                        <p>{order.orderDate}</p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Payment</p>
                        {order.isPaid === 1 ? (
                          <Tag color="green">Completed</Tag>
                        ) : (
                          <Tag color="volcano">Not Completed</Tag>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <div
                      className="mx-n5 px-5 py-4"
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      <MDBRow>
                        <MDBCol md="5" lg="5">
                          <p style={{ fontWeight: "bold" }}>Service Name</p>
                        </MDBCol>
                        <MDBCol md="3" lg="3">
                          <p style={{ fontWeight: "bold" }}>Quantity</p>
                        </MDBCol>
                        <MDBCol md="2" lg="2">
                          <p style={{ fontWeight: "bold" }}>Weight</p>
                        </MDBCol>
                        <MDBCol md="2" lg="2">
                          <p style={{ fontWeight: "bold" }}>Price</p>
                        </MDBCol>
                      </MDBRow>

                      {item?.map((item, index) => (
                        <MDBRow>
                          <MDBCol md="5" lg="5">
                            <p>{item.laundryService.name}</p>
                          </MDBCol>
                          <MDBCol md="3" lg="3">
                            <p>{item.quantity}</p>
                          </MDBCol>
                          {item.laundryService.isStandard === true ? (
                            <MDBCol md="2" lg="2">
                              <p>{item.weight}kg</p>
                            </MDBCol>
                          ) : (
                            <MDBCol md="2" lg="2"></MDBCol>
                          )}
                          <MDBCol md="2" lg="2">
                            <p>{item.total.toLocaleString()}$</p>
                          </MDBCol>
                        </MDBRow>
                      ))}
                    </div>
                    <MDBRow className="my-4">
                      <MDBCol
                        md="4"
                        className="offset-md-8 col-lg-3 offset-lg-9"
                      >
                        <p
                          className="lead fw-bold mb-0"
                          style={{
                            color: "#f37a27",
                            fontSize: "20px",
                            marginLeft: "22px",
                          }}
                        >
                          {order.total.toLocaleString()}$
                        </p>
                      </MDBCol>
                    </MDBRow>

                    <p
                      className="lead fw-bold mb-4 pb-2"
                      style={{ color: "#f37a27", fontSize: "20px" }}
                    >
                      Tracking order
                    </p>

                    <div>
                      <Timeline
                        pending={order.status < 7 ? pendingStatus : null}
                        items={statusArray}
                      />
                    </div>

                    {order.status > 1 &&
                      order.status < 7 &&
                      order.status !== 4 &&
                      (order?.status !== 6 || order.isPaid === 1) && (
                        <Button
                          style={{
                            marginRight: "30px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                          }}
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          onClick={handleButtonClick}
                          size="large"
                        >
                          {buttonMap[order?.status]}
                        </Button>
                      )}
                    {order.status === 6 && order.isPaid === 0 ? (
                      <Popconfirm
                        title="Confirm collection?"
                        onConfirm={handleButtonClick}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ backgroundColor: "#FFD700", color: "black" }}
                          type="primary"
                          icon={<DollarCircleOutlined />}
                          size="large"
                        >
                          Collect payment
                        </Button>
                      </Popconfirm>
                    ) : null}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
    </>
  );
}
