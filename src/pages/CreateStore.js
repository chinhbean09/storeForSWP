import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Upload, Select } from 'antd';
import { config } from "../utils/axiosconfig";

// const { TextArea } = Input;

const initialState = {

  name: '',
  address: '',
  district: '',
  phone: ''
}

const error_init = {
  name_err: '',
  address_err: '',
  district_err: '',
  phone_err: ''
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const districts = [
  {
    value: "Quận 1",
  },
  {
    value: "Quận 2",
  },
  {
    value: "Quận 3",
  },
  {
    value: "Quận 4",
  },
  {
    value: "Quận 5",
  },
  {
    value: "Quận 6",
  },
  {
    value: "Quận 7",
  },
  {
    value: "Quận 8",
  },
  {
    value: "Quận 9",
  },
];

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store";

const CreateStore = (props) => {

  
  const { Option } = Select;
  const [form] = Form.useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { name, address, district, phone } = state;

  const data = {
    name: state.name,
    address: state.address
  }
  

  
  const [errors, setErrors] = useState(error_init);

  const getInfoStore = async () => {
    const res = await axios.get(`${URL}/get`, {
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
  }

    useEffect(() => {
      getInfoStore();
      
    },[]);
    console.log(data.address)

  // console.log(state)

  const designStore = async (data) => {
    const res = await axios.post(`${URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'

      },
    });
    if (res.status === 200 || res.status === 201) {
      toast.success("New Information has been added successfully ~");
      navigate('/admin/design-store');
    }
  }


  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    // if (name.trim() === '') {
    //   errors.name_err = 'Name is Required';
    //   isValid = false;
    // }

    // if (description.trim() === '') {
    //   errors.description_err = 'Description is required';
    //   isValid = false;
    // }
    // if (isNaN(price) || parseInt(price) < 1000 || price === '') {
    //   errors.price_err = 'Price must be a positive number and more than or equal 1000';
    //   isValid = false;
    // }
    // if (unit.trim() === '') {
    //   errors.unit_err = 'Unit is Required';
    //   isValid = false;
    // }
    // if (!Array.isArray(materials) || materials.length === 0) {
    //   errors.materials_err = 'Material is Required'; // Sửa thông báo lỗi thành "Material is Required"
    //   isValid = false;
    // }


    setErrors(errors);
    return isValid;
  }

  const handleSubmit = (event) => {
    form
      .validateFields()
      .then((values) => {
        // if (store?.id !== undefined) {

        //   updateStandardService(standardService?.id, values);
        // }

        // else {
        console.log(values)
        
        designStore(values);
        // }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }
  // if (validateForm()) {
  //     designStore(event);
  // } else {
  //   toast.error("Some info is invalid ~ Pls check again");
  // }
  // console.log(event)
  //}
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const handleInputChange = (event) => {
    if (event && event.target) {
      let { name, value } = event.target;
      setState((state) => ({ ...state, [name]: value }));
    }
  };

  const [componentDisabled, setComponentDisabled] = useState(true);

  return (
    <Wrapper>

      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <h2>{"Design Store"}</h2>
                <br></br>
                <Checkbox
                  checked={componentDisabled}
                  onChange={(e) => setComponentDisabled(e.target.checked)}>
                  Form disabled
                </Checkbox>

                <Form
                  form={form}
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

                  {/* <Form.Item label="Name">
                    <Input type="text" name='name' value={name} onChange={handleInputChange} />
                    {errors.name_err && <span className='error'>{errors.name_err}</span>}
                  </Form.Item> */}

                  <Form.Item label="Name">
                    <Input name='name' defaultValue={name} rules={[{ required: true, message: `Vui lòng nhập dữ liệu !` }]} />
                    {errors.name_err && <span className='error'>{errors.name_err}</span>}

                  </Form.Item>

                  <Form.Item label="Địa Chỉ" >
                    <Input  name='address' rules={[{ required: true, message: `Vui lòng nhập dữ liệu !` }]} value={data.address} />
                    {/* {errors.description_err && <span className='error'>{errors.description_err}</span>} */}
                  </Form.Item>

                  <Form.Item label="Quận Cửa Hàng" name="district">

                    <Select
                      size='large'
                      placeholder="Please select"
                      value={district}
                      onChange={handleInputChange}
                      options={districts}
                    />

                  </Form.Item>

                  <Form.Item label="Phone" name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={phone}
                      // onChange={handleInputChange}
                      // addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                      }}
                    />
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
      </div>
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

export default CreateStore;