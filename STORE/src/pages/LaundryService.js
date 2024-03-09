import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/dashboard.css';
import { config } from "../utils/axiosconfig";
import StandardDetailForm from "../components/StandardForm";

const URL = "http://localhost:8001/api/v1/store/special-service";


const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.title.name,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "material",
    dataIndex: "materials",

  },
  {
    title: "cloth",
    dataIndex: "cloth",

  },
  {
    title: "unit",
    dataIndex: "unit",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const LaundryService = () => {

  return (

    <div>
      <StandardDetailForm></StandardDetailForm>
    </div>
  );
};

export default LaundryService;
