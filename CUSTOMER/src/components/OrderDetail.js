import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { Button, Timeline, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Popconfirm } from "antd";
import { Spin } from "antd";
import { Tag } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function OrderDetails() {
  let { id } = useParams();
  id = Number(id);
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState([]);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/user/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access_token")
            )}`,
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setOrder(response.data);
      const sortedItems = response.data.items.sort((a, b) => a.id - b.id);
      setItem(sortedItems);
    } catch (error) {
      console.error(error);
      setError(error.toJSON().message);
    }
  };
  const navigator = useNavigate();
  const payment = async (param1, param2) => {
    try {
      const response = await axios.get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/confirm?paymentId=${param1}&PayerID=${param2}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.data) navigator();
      message.success("Thanh toán thành công!");
      // setItem(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const param1 = urlSearchParams.get("paymentId");
    const param2 = urlSearchParams.get("PayerID");
    if ((param1 === null) & (param2 === null)) fetchData();
    else payment(param1, param2);
  }, []);

  useEffect(() => {
    // Call the function once when the component mounts
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Changed to 2 seconds as per your requirement

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  console.log(error);
  const handleButtonClick = async () => {
    try {
      const response = await axios.delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/user/order/cancel/${id}`,
        {headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    if (response.status === 200) {
      setOrder((prevOrder) => ({ ...prevOrder, status: 0 }));
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
  1: "Awaiting confirmation",
  2: "Awaiting pickup from customer",
  3: "Transporting to store",
  4: "Processing by store",
  5: "Order ready for delivery",
  6: "Order being delivered to customer",
  7: "Order completed",
};

let statusArray = [];
for (let i = 1; i < order.status; i++) {
  statusArray.push({ children: statusMap[i] });
}
if (order.status === 7) {
  statusArray.push({ children: statusMap[order.status] });
} else if (order.status === 0) {
  statusArray.push({ children: "Canceled" });
}
let pendingStatus = statusMap[order.status];
const handlepayment = async () => {
  try {
    const response = await axios.post(
      `https://magpie-aware-lark.ngrok-free.app/api/v1/base/checkout/${id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    console.log(response.data);
    window.location.href = response.data;
  } catch (error) {
    console.error(error);
  }
};

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
      <Spin style={{ marginTop: "15px" }} tip="Fetching data..." size="large">
        <div className="content" />
      </Spin>
    ) : (
      <section className="h-100 h-custom">
        <Link to={`/profilelayout/history`}>
          <button className="back-button" type="button">
            <span style={{ marginLeft: "5px" }}>Go back </span>
            <AiIcons.AiOutlineRollback
              style={{ width: "20px", marginLeft: "10px" }}
            />
          </button>
        </Link>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6"><MDBCard className="border-3 border-color-custom MDBCard">
                  <MDBCardBody className="p-5">
                    <p
                      className="lead fw-bold mb-5 "
                      style={{ color: "#f37a27", fontSize: "30px" }}
                    >
                      Order Details
                    </p>
                    <MDBRow>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Store name</p>
                        <p>{order.store?.name}</p>
                      </MDBCol>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Payment</p>
                        {order.isPaid === 1 ? (
                          <Tag color="green">Completed</Tag>
                        ) : (
                          <Tag color="volcano">Not Completed</Tag>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">Order date</p>
                        <p>{order.orderDate}</p>
                      </MDBCol>
                      <MDBCol className="mb-3">
                        <p className="small text-muted mb-1">ID</p>
                        <p>{order?.orderCode}</p>
                      </MDBCol>
                    </MDBRow>

                    <div
                      className="mx-n5 px-5 py-4"
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      <MDBRow>
                        <MDBCol md="4" lg="4">
                          <p style={{ fontWeight: "bold" }}>Service name</p>
                        </MDBCol>
                        <MDBCol md="2" lg="2">
                          <p style={{ fontWeight: "bold" }}>Quantity</p>
                        </MDBCol>
                        <MDBCol md="2" lg="2">
                          <p style={{ fontWeight: "bold" }}>Weight</p>
                        </MDBCol>
                        <MDBCol md="2" lg="2">
                          <p style={{ fontWeight: "bold" }}>Price</p>
                        </MDBCol>
                        {order.status === 7 ? (
                          <MDBCol md="2" lg="2">
                            <p style={{ fontWeight: "bold" }}>Feedback</p>
                          </MDBCol>
                        ) : null}
                      </MDBRow>

                      {item?.map((item, index) => (
                        <MDBRow className="my-3">
                          <MDBCol md="4" lg="4">
                            <p>{item.laundryService.name}</p>
                          </MDBCol>
                          <MDBCol md="2" lg="2">
                            <p>{item.quantity}</p>
                          </MDBCol>
                          {item.laundryService.isStandard === true ? (<MDBCol md="2" lg="2">
                              <p>{item.weight}kg</p>
                            </MDBCol>
                          ) : (
                            <MDBCol md="2" lg="2"></MDBCol>
                          )}
                          <MDBCol md="2" lg="2">
                            <p>{item.total.toLocaleString()}$</p>
                          </MDBCol>
                          {order.status === 7 ? (
                            <MDBCol md="2" lg="2">
                              <Link
                                to={`/profilelayout/feedback/${item.laundryService.id}`}
                              >
                                <Tag className="review-tag" color="blue">
                                  Feedback
                                </Tag>
                              </Link>
                            </MDBCol>
                          ) : null}
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
                            marginLeft: "-65px",
                          }}
                        >
                          {order.total?.toLocaleString()}$
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
                    {order.status === 1 && (
                      <Popconfirm
                        title="Do you want to cancel this order?"
                        onConfirm={handleButtonClick}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" size="large">
                          Cancel
                        </Button>
                      </Popconfirm>
                    )}
                    {order.status > 4 && order.isPaid === 0 && (
                      <PayPalScriptProvider>
                        <PayPalButtons
                          onClick={handlepayment}
                          type="primary"
                          size="large"
                        >
                          Payment
                        </PayPalButtons></PayPalScriptProvider>
                    )}
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