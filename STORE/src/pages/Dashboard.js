import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Column from "@ant-design/plots/es/components/column";
import { Table, TimePicker } from "antd";
import { Select, DatePicker } from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import 'moment/locale/zh-cn';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { format, set } from "date-fns";
import numeral from "numeral";
import { Tag } from "antd";
import Loading from "../components/LoadingSpinner";

const { Option } = Select;
function getDate(params) {
  const data = params?.split(".");
  return data[0];
}
function generateCurrency(params) {
  return params.toLocaleString('it-IT', { style: 'currency', currency: 'USD' });
}
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order date",
    dataIndex: "date",
  },
  {
    title: "Customer",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "staus",
    render: (status) => (
      <>
        {renderComponent(1)}
      </>
    )
  },
  {
    title: "Total",
    dataIndex: "total",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}

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

          default:
            return null;
        }
      })()}
    </div>
  )
}


const Dashboard = () => {
  const navigate = useNavigate();
  // const getCurrentMonthYear = () => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Thêm '0' đằng trước nếu tháng < 10
  //   return `${year}-${month}`;
  // };
  const now = new Date();
  const getCurrentMonthYear = moment(now).format('yyyy-mm');
  const getCurrentYear = moment(now).format('yyyy');
  const [selectedOption, setSelectedOption] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear);
  const [apiData, setApiData] = useState([]);
  const [apiTotal, setApiTotal] = useState();
  // const [data1, setData1] = useState([]);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(getCurrentYear);
  const handleSelectChange = (value) => {
    setSelectedOption(value);
    if (value === 'month') {
      setSelectedYear(null);
      
    }
    if (value === 'year') {
      setSelectedMonth(null);
    }
  };
  const handleMonthChange = (date, dateString) => {

    api(dateString);
    setSelectedMonth(dateString);

  };
  const handleYearChange = (date, dateString) => {

    api1(dateString);
    setSelectedYear(dateString);

  };
  //console.log(getCurrentYear)

  const { userInfoDTO } = useSelector((state) => state.auth);

  const [state, setState] = useState([]);

  const [isLoading, setLoading] = useState(true);



  useEffect(() => {
    // Call the function once when the component mounts
    getHistoryOrders(userInfoDTO.id).finally(() => setLoading(false));
    api2();
    // const interval = setInterval(() => {
    //   getHistoryOrders(userInfoDTO.id);
    // }, 1500); // Changed to 2 seconds as per your requirement

    // // Clear the interval when the component is unmounted
    // return () => clearInterval(interval);
  }, []);

  const getHistoryOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8001/api/v1/store/order/all/new`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          'ngrok-skip-browser-warning': 'true'
        },
      });
      if (res.status === 200) {
        setState(res.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
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

  const api = async (data) => {
    const res = await axios.get(`http://localhost:8001/api/v1/store/dashboard/month?target=${data}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    if (res.status === 200) {
      setApiData(res.data);


    }

  }
  const api1 = async (data) => {
    const res = await axios.get(`http://localhost:8001/api/v1/store/dashboard/year?target=${data}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    if (res.status === 200) {

      setApiData(res.data);
    }

  }
  const api2 = async () => {
    const res = await axios.get(`http://localhost:8001/api/v1/store/dashboard`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    if (res.status === 200) {

      setApiTotal(res.data);
    }

  }
  //console.log('apiTotal:'+ apiTotal.avgOrder);


  useEffect(() => {
    if (selectedOption === "month"){
      api(setSelectedMonth)
    }

    if(selectedOption === "year"){
    api1(setSelectedYear)
    }
    
    
    if (selectedOption === "month" & selectedMonth === null) {
      setData([])
      //api(getCurrentMonthYear)
    
    
    }
    
  else if (selectedOption === "year" & selectedYear === null) {
      setData([])
     
    }
    
     else if (apiData) {
        const newDataArray = apiData?.map(item => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return { key, value };
        });

        setData(newDataArray);

      } else {
        setData([])
      }
    


    //console.log("after fetch " + newDataArray.map((item, index) =>(item.key + "and" + item.value)))

    //setData(newDataArray)
  }, [apiData,selectedOption]);




  const config = {
    data,
    xField: "key",
    yField: "value",
    color: ({ key }) => {
      return "#27A4f2";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,

      },
    },
    meta: {
      value: { alias: "value" }
    },

  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3 grid-three-column">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Avg Order of a month</p>
            <h4 className="mb-0 sub-title">{apiTotal?.avgOrder.toFixed(2)}</h4>
          </div>

        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Revenue in 1 month</p>
            <h4 className="mb-0 sub-title">{apiTotal?.revenue}</h4>
          </div>

        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 ">
          <div>
            <p className="desc">Finished orders in month</p>
            <h4 className="mb-0 sub-title">{apiTotal?.finishedOrder}</h4>
          </div>

        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title" style={{ marginBottom: '20px' }}>Income Statics</h3>
        <Select defaultValue="year" style={{ width: 120 }} onChange={handleSelectChange}>
          <Option value="year">Year</Option>
          <Option value="month">Month</Option>
        </Select>
        {selectedOption === "year" && (
          <DatePicker.YearPicker onChange={handleYearChange} />
        )}
        {selectedOption === "month" && (
          <DatePicker.MonthPicker format="YYYY-MM" onChange={handleMonthChange} />
        )}
        <br></br>
        <br></br>

        <div>
          {data.length < 1 ? "No data available" : <Column {...config} />}

        </div>

      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        {isLoading ? (
          // Show loading spinner while data is loading
          <Loading></Loading>
        ) : state.length > 0 ? (
          // Show the table if there is data
          <Table columns={columns} dataSource={data1} />
        ) : (
          // Show the message if there are no orders
          <p className="text-danger1">No new order.</p>
        )}
      </div>
    </div>
  );

};

export default Dashboard;
