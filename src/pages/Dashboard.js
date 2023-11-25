import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Column from "@ant-design/plots/es/components/column";
import { Table, TimePicker } from "antd";
import { Select, DatePicker } from "antd";
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from "date-fns";
import numeral from "numeral";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
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
const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const handleSelectChange = (value) => {
    setSelectedOption(value);
    if(value === 'month'){
      setSelectedYear(null)
    }
    if(value === 'year'){
      setSelectedMonth(null)
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
  console.log(data)

  const api = async (data) => {
    const res = await axios.get(`https://magpie-aware-lark.ngrok-free.app/api/v1/base/dashboard/month?target=${data}`, {
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
    const res = await axios.get(`https://magpie-aware-lark.ngrok-free.app/api/v1/base/dashboard/year?target=${data}`, {
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




  useEffect(() => {
    console.log(selectedYear)
    if (selectedOption === 'month'  && selectedMonth === null) {
      setData([])
    }
    else if (selectedOption === 'year'  && selectedYear === null) {
      setData([])
    }
    else {
      if (apiData) {
        const newDataArray = apiData?.map(item => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return { key, value };
        });

        setData(newDataArray);

      } else {
        setData([])
      }
    }










    //console.log("after fetch " + newDataArray.map((item, index) =>(item.key + "and" + item.value)))

    //setData(newDataArray)
  }, [apiData, selectedOption]);




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
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title" style={{ marginBottom: '20px' }}>Income Statics</h3>
        <Select defaultValue="year" style={{ width: 120 }} onChange={handleSelectChange}>
          <Option value="year">Năm</Option>
          <Option value="month">Tháng</Option>
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
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
