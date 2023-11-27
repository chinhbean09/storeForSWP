import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/dashboard.css';
import { config } from "../utils/axiosconfig";
import productService from "../features/product/productService";
import { base_url } from "../utils/baseUrl";
import LoadingSpinner from "../components/LoadingSpinner";

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/special-service";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
    // sorter: (a, b) => a.name.length - b.title.name,
  },
  
  {
    title: "Chất liệu",
    dataIndex: "materials",

  },
  {
    title: "Loại áo",
    dataIndex: "cloth",

  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {

  const dispatch = useDispatch();
  const { userInfoDTO } = useSelector((state) => state.auth);

  console.log("product:" + JSON.parse(localStorage.getItem("access_token")));
  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure that you want to delete Product with ID: ${id}`)) {
      const res = await axios.delete(`${URL}/delete/${id}`, config);
      console.log(res)
      if (res.status === 200) {
        //re-render Data
      
        toast.success("Deleted Successfully ~");
        dispatch(getProducts(userInfoDTO.id));
      } else {
        toast.error("Delete: Error!");
      }
    }
  }

  


  useEffect(() => {

    dispatch(resetState());
    dispatch(getProducts(userInfoDTO.id))
   
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const { isSuccess } = useSelector((state) => state.product);
  const data1 = [];

  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      id: productState[i].id,
      name: productState[i].name,
      materials: productState[i].materials.map((material) => material.name + " "),
      price: productState[i].details[0].price,
      unit: productState[i].details[0].unit,
      cloth: productState[i].cloth.name,
      action: (
        <>
          <Link to={`update/${productState[i].id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link onClick={() => handleDelete(productState[i].id)} className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (

    <div>
      <div className="btn-add">
        <Link to={'add'}>
          <button className='add-staff-btn'>THÊM MỚI DỊCH VỤ</button>
        </Link>
      </div>
      <h3 className="mb-4 title">Dịch vụ</h3>
 
        <div>
        {!isSuccess ? <LoadingSpinner /> :   <Table columns={columns} dataSource={data1} />}
        
        </div>


    </div>
  );
};

export default Productlist;
