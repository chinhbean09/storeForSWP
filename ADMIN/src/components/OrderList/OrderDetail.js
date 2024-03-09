import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import "./OrderDetail.css";
import { BackButton } from "../BackButton/BackButton";
import { useState } from "react";
import axios from "axios";
import { Button, Timeline } from "antd";
export default function OrderDetails() {
  let { id } = useParams();
  id = Number(id);
  // const [order, setThisOrder] = useState(
  //   orders.find((prod) => prod.id === id)
  // );

  const [order, setOrder] = useState();
  const [item, setItem] = useState([]);
  React.useEffect(() => {
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
        setItem(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const statusMap = {
    1: "Chờ xác nhận",
    2: "Chờ lấy hàng từ khách hàng",
    3: "Vận chuyển đến cửa hàng",
    4: "Đang xử lý bởi cửa hàng",
    5: "Đơn sẵn sàng vận chuyển",
    6: "Đơn đang được giao đến khách hàng",
    7: "Đơn đã hoàn thành",
  };

  let statusArray = [];
  for (let i = 1; i < order?.status; i++) {
    statusArray.push({ children: statusMap[i] });
  }
  if (order?.status === 7) {
    statusArray.push({ children: statusMap[order?.status] });
  }
  let pendingStatus = statusMap[order?.status];
  return (
    <>
      <section className="h-100 h-custom">
        <BackButton Root={"order"} />
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom MDBCard">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                    Purchase Receipt
                  </p>
                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">User</p>
                      <p>{order?.user.fullName}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">to store</p>
                      <p>{order?.store.name}</p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{order?.orderDate}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>{order?.id}</p>
                    </MDBCol>
                  </MDBRow>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    {item.map((item, index) => (
                      <MDBRow>
                        <MDBCol md="8" lg="9">
                          <p>{item.laundryService.name}</p>
                        </MDBCol>
                        <MDBCol md="4" lg="3">
                          <p>{item.total.toLocaleString()}₫</p>
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </div>
                  <MDBRow className="my-4">
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        {order?.total.toLocaleString()}₫
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#f37a27" }}
                  >
                    Tracking Order
                  </p>

                  <div>
                    <Timeline
                      pending={order?.status < 7 ? pendingStatus : null}
                      items={statusArray}
                    />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
