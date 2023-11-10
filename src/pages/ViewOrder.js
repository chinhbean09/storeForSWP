import React, { useEffect } from "react";
import { Input, Table, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state.auth.orderbyuser[0].products);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      count: orderState[i].count,
      amount: orderState[i].product.price,
      color: orderState[i].product.color,
      date: orderState[i].product.createdAt,
      action: (
        <>
          {/* <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link> */}

          <Input></Input>
        </>
      ),
    });
  }
  return (



    <>


      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8">

            <div class="card mb-4">
              <div class="card-body">
                <div class="row">

                  <Table></Table>

                </div>
              </div>
            </div>
            <div class="col-lg-4">
            <div class="card mb-4">
              <h2 class="fw-bolder">Khách hàng</h2>

                <Form>


                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default ViewOrder;
