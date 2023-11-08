import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Upload, Radio, Select, Space } from 'antd';
import { config } from "../utils/axiosconfig";
import LoadingSpinner from "./LoadingSpinner";

const { TextArea } = Input;

const initialState = {
  no: '',
  name: '',
  price: '',
  description: '',
  image: '',
  price: '',
  unit: '',
  materials:[],
  cloth:'',
}

const error_init = {
  name_err: '',
  price_err: '',
  description_err: '',
  image_err: '',
  unit_err: '',
  cloth_err: '',
  materials_err:''
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/special-service";

const SpecialDetailForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [allMaterials, setAllMaterials] = useState([]);
  const [clothes, setClothes] = useState([]);
  const { name, description, price, unit, cloth, materials } = state;
  const [errors, setErrors] = useState(error_init);
  const [isSuccess, setStateIsSuccess] =  useState(false);

  const getOneService = async (id) => {
    const res = await axios.get(`${URL}/${id}`, { headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      Accept: "application/json",
      "Access-Control-Allow-Origin":"*",
      'ngrok-skip-browser-warning': 'true'
      
    },});
    if (res.status === 200) {
      setStateIsSuccess(true);
      setState(res.data);
    }
  }

  const getAllCloth = async () => {
    const res = await axios.get('https://magpie-aware-lark.ngrok-free.app/api/v1/base/cloth/all', config);
    if (res.status === 200) {
      setClothes(res.data);
    }
  }
  const getAllMaterial = async () => {
    const res = await axios.get('https://magpie-aware-lark.ngrok-free.app/api/v1/base/material/all', config);
    if (res.status === 200) {
      setAllMaterials(res.data);
    }
  }

  const data1 = [];
  for(let i = 0; i < clothes.length; i++){
    data1.push({
      value:clothes[i].id,
      label:clothes[i].name,
    })
  }
  const data2 = [];
  for(let i = 0; i < allMaterials.length; i++){
    data2.push({
      value:allMaterials[i].id,
      label:allMaterials[i].name,
    })
  }

  useEffect(() => {
    if (id) getOneService(id);
    getAllCloth();
    getAllMaterial();
  }, [id]);


console.log(state)


  const updateService = async (id, data) => {
    const res = await axios.put(`${URL}/update/${id}`, data, config);
    if (res.status === 200) {
      toast.success(`Updated Product with ID: ${id} successfully ~`);
      navigate('/admin/list-product');
    }
  }
  
  

  const addNewService = async (data) => {
    const res = await axios.post(`${URL}/create`, data, config);
    if (res.status === 200 || res.status === 201) {
      toast.success("New Product has been added successfully ~");
      navigate('/admin/list-product');
    }
  }
  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (name.trim() === '') {
      errors.name_err = 'Name is Required';
      isValid = false;
    }

    if (description.trim() === '') {
      errors.description_err = 'Description is required';
      isValid = false;
    }
    if (isNaN(price) || parseInt(price) < 1000 || price === '') {
      errors.price_err = 'Price must be a positive number and more than or equal 1000';
      isValid = false;
    }
    if (unit.trim() === '') {
      errors.unit_err = 'Unit is Required';
      isValid = false;
    }
    if (!Array.isArray(materials) || materials.length === 0) {
      errors.materials_err = 'Material is Required'; // Sửa thông báo lỗi thành "Material is Required"
      isValid = false;
    }
    

    setErrors(errors);
    return isValid;
  }

  const handleSubmit = (event) => {

    //event.preventDefault();
    if (validateForm()) {
      if (id) updateService(id, state);
      else addNewService(state);
      console.log(state)
    } else {
      toast.error("Some info is invalid ~ Pls check again");
    }
  }

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  }

  const handleClothInputChange = (event) => {
    setState({...state, cloth: event});
  }

  
  const handleMaterialInputChange = (event) => {

    setState({...state, materials: event});
   
  }

  const [componentDisabled, setComponentDisabled] = useState(true);

  return (
    <Wrapper>
      {!isSuccess ? <LoadingSpinner /> : 
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <h2>{id ? "Update Form" : "Add New Service"}</h2>
                <br></br>
                <Checkbox
                  checked={componentDisabled}
                  onChange={(e) => setComponentDisabled(e.target.checked)}
                // className="float-end"
>
                  Form disabled
                </Checkbox>
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  style={{
                    maxWidth: 1600,
                  }}
                  onFinish={handleSubmit}
                >
                  <br />
                  <Form.Item label="Name">
                    <Input type="text" name='name' value={name} onChange={handleInputChange} />
                    {errors.name_err && <span className='error'>{errors.name_err}</span>}
                  </Form.Item>
                  
                  <Form.Item label="Material">
                  <Select
                      mode="multiple"
                      size='large'
                      placeholder="Please select"
                      value={materials}
                      onChange={handleMaterialInputChange}
                      style={{
                        width: '100%',
                      }}
                      options={data2}
                    />
                    {errors.materials_err && <span className='error'>{errors.materials_err}</span>}
                  </Form.Item>
                  <Form.Item label="Cloth">
                    <Select
                      size='small'
                      placeholder="Please select"               
                      value={state.cloth}
                      onChange={handleClothInputChange}
                      style={{
                        width: '100%',
                      }}
                      options={data1}
                    />
                    {errors.cloth_err && <span className='error'>{errors.cloth_err}</span>}
                  </Form.Item>
                 
                    <Form.Item label="Unit">
                      <Input type="text" name='unit' value={unit} onChange={handleInputChange} />
                      {errors.unit_err && <span className='error'>{errors.unit_err}</span>}
                    </Form.Item>
                    <Form.Item label="Price">
                      <Input type="number" name='price' value={price} onChange={handleInputChange} />
                      {errors.price_err && <span className='error'>{errors.price_err}</span>}
                    </Form.Item>
              

                  <Form.Item label="Description">
                    <TextArea rows={4} type="text" name='description' value={state.description} onChange={handleInputChange} />
                    {errors.description_err && <span className='error'>{errors.description_err}</span>}
                  </Form.Item>

                  <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>

                  </Form.Item>
                  <Form.Item className="float-end">
                    <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
                  </Form.Item>

                </Form>
              </div>
            </div>

          </div>
        </div>
      </div>}
    </Wrapper>

  );
};

const Wrapper = styled.section`
  padding: 10px;

  .ant-table-thead .ant-table-cell {
    background-color:#00A9FF;
    color:white;
    border-radius: 0;
    text-align:center;
  }
  .ant-table-tbody .ant-table-cell {
    text-align:center;
  }

  .img-logo-section {
    
    min-width: 50rem;
    height: 350px;
   
  }

  .checked {  
    color :#Ffee21 ;  
    font-size : 20px;  
}  
.unchecked {  
    font-size : 20px;  
}  

  img {
    min-width: 200px;
    height: 20rem;
    border-radius: 1rem;
  }

  .hero-section-data {

    

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-left: 10%;
      
    }
  }

  .hero-section-image {
    width: 90%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }


    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default SpecialDetailForm;