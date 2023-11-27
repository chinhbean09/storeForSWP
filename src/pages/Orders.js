import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { } from "../features/auth/authSlice";
import { config } from "../utils/axiosconfig";

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/order/all";
function renderComponent(params) {
  return (
    <div>
      {(() => {
        switch (params) {
          case 1:
            return (
              <Tag color="orange" key={1}>
                Đang chờ xác nhận
              </Tag>

            );
          case 2:
            return (<Tag color="cyan" key={2}>
              Đang chờ lấy đồ từ khách...
            </Tag>);
          case 3:
            return (<Tag color="blue" key={3}>
              Đang vận chuyển
            </Tag>);
          case 4:
            return (<Tag color="yellow" key={4}>
              Đơn đang xử lý
            </Tag>);
          case 5:
            return (<Tag color="blue" key={5}>
              Đơn sẵn sàng vận chuyển
            </Tag>);
          case 6:
            return (<Tag color="cyan" key={6}>
              Đơn đang được vận chuyển đến khách
            </Tag>);
          case 7:
            return (<Tag color="green" key={7}>
              Đơn đã hoàn thành
            </Tag>);
          case 0:
            return (<Tag color="red" key={0}>
              Đã hủy
            </Tag>);
          default:
            return null;
        }
      })()}
    </div>
  )
}

function generateCurrency(params) {
  return params.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
function getDate(params) {
  const data = params?.split(".");
  return data[0];
}
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Ngày Đặt Hàng",
    dataIndex: "date",
    
  },
  {
    title: "Khách hàng",
    dataIndex: "name",
    //sorter: (a, b) => a.name.length - b.title.name,
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    key: "status",
    sorter: (a,b) => a.status - b.status,
    render: (status) => (
      <>               
        {renderComponent(status)}
      </>
    )
  },
  {
    title: "Tổng Giá",
    dataIndex: "total",
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
    try {
        const res = await axios.get(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                'ngrok-skip-browser-warning': 'true'
            },
        });

        if (res.status === 200) {
            if (res.data) {
                setState(res.data);
            } else {
                // Display a message indicating no data
                console.log("Chưa có thời gian giao hàng cho cửa hàng");
                // Optionally, show a user-friendly message
                // toast.info("Chưa có thời gian giao hàng cho cửa hàng");
            }
        }
    } catch (error) {
        // Handle network or other errors here
        console.error("Error in getHistoryOrders:", error.message);
        // Optionally, display an error message to the user
        // toast.error("Error fetching history orders. Please try again.");
    }
};


  //const orderState = useSelector((state) => state.auth.orders);
  console.log(state)
  const data1 = [];
  for (let i = 0; i < state.length; i++) {
    data1.push({
      key: i + 1,
      date: getDate(state[i].orderDate),
      name: state[i].user.fullName,
      status: state[i].status,

      total: generateCurrency(state[i].total),
      action: (
        <>
          <Link to={`/admin/order/${state[i].id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          
        </>
      ),
    });
  }
  return (
    <div>
    <h3 className="mb-4 title">Quản lý đơn hàng</h3>
    {state.length > 0 ? (
      <Table columns={columns} dataSource={data1} />
    ) : (
      <p className="text-danger">Error fetching data. Please try again later.</p>
    )}
  </div>
  );
};

export default Orders;
