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

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/special-service";


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

const Productlist = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure that you want to delete Product with ID: ${id}`)) {
        const res = await axios.delete(`${URL}/${id}`, config);
        console.log(res)
        if (res.status === 200) {
            //re-render Data
            getProducts();
            toast.success("Deleted Successfully ~");
        } else {
            toast.error("Delete: Error!");
        }
    }
}
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: productState[i].id,
      name: productState[i].name,
      description: productState[i].description,
      materials: productState[i].materials.map((material)=> material.name + " "),
      price: productState[i].details[0].price,
      unit :productState[i].details[0].unit,
      cloth:productState[i].cloth.name,
     
      action: (
        <>
          <Link to={`update/${productState[i].id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link  onClick={() => handleDelete(productState[i].id)} className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
         
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
       <div className="btn-add">
                <Link to={'add'}>
                    <button className='add-staff-btn'>ADD NEW PRODUCT</button>
                </Link>
      </div>
      <h3 className="mb-4 title">Products</h3>
      
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
