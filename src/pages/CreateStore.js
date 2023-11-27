import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Upload, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {createStore,getStore, resetState} from "../features/store/storeSlice"
import { base_url } from "../utils/baseUrl";


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

  const { userInfoDTO } = useSelector((state) => state.auth);
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { name, address, district, phone } = state;
  const [forceRerender, setForceRerender] = useState(false); // state for forceUpdate


  useEffect(() => {
    dispatch(resetState())
    dispatch(getStore(userInfoDTO.id));
    dispatch(createStore())
  }, [dispatch, forceRerender]);

  const { store } = useSelector((state) => state.store);
  
  const [errors, setErrors] = useState(error_init);

  const handleSubmit = (event) => {
    form.validateFields().then((values) => {
      if(store?.id !== undefined){
        updateStore(store?.id,values);
      } else {
        console.log(values)
        dispatch (createStore(values));
      }
      navigate('/store/design-store');
      setForceRerender(!forceRerender);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  const updateStore = async (id, data) => {
    try {
        const res = await axios.put(`${base_url}store/update?store=${id}`, data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                'ngrok-skip-browser-warning': 'true'
            },
        });

        if (res.status === 200) {
            if (res.data) {
                // Assuming there is some specific property in the data that indicates success
                toast.success(`Đã thiết kế thành công cửa hàng của bạn`);
                navigate('/store/design-store');
                setForceRerender(!forceRerender);
                setComponentDisabled(true);
            } else {
                // Display a message indicating no data
                console.log("Chưa có thời gian giao hàng cho cửa hàng");
                // Optionally, show a user-friendly message
                // toast.info("Chưa có thời gian giao hàng cho cửa hàng");
            }
        }
    } catch (error) {
        // Handle network or other errors here
        console.error("Error in updateStore:", error);
        // Optionally, display an error message to the user
        // toast.error("Error updating store. Please try again.");
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
                <h2>{store?.id? " Cập nhật thông tin cửa hàng": "Đăng ký thông tin cửa hàng"}</h2>
                <br></br>
                <Checkbox
                  checked={componentDisabled}
                  onChange={(e) => setComponentDisabled(e.target.checked)}>
                  Biểu mẫu bị vô hiệu hóa
              
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
                  fields={[
                    {
                      name: ["name"],
                      value: store?.name,
                    },
                    {
                      name:["district"],
                      value: store?.district,
                    },
                    {
                      name:["address"],
                      value: store?.address
                    },
                    {
                      name:["phone"],
                      value: store?.phone 
                    }
                    
                  ]}>
                       <br></br> 
                  <Form.Item label="Tên Cửa Hàng" name='name' rules={[{  required: true, message: `Vui lòng nhập tên cửa hàng !` }]}>
                    <Input  defaultValue={store?.name} ></Input>
                  </Form.Item>
                  <Form.Item label="Địa Chỉ" name='address' rules={[{ required: true, message: `Vui lòng nhập địa chỉ !` }]}>
                    <Input  defaultValue={store?.address} ></Input>
                  </Form.Item>
                  <Form.Item label="Quận Cửa Hàng" name="district" rules={[{ required: true, message: `Vui lòng chọn quận cửa hàng !` }]}>
                    <Select
                      size='large'
                      placeholder="Chọn Quận Cửa Hàng"
                      defaultValue={store?.district}
                      options={districts}/>
                  </Form.Item>
                  <Form.Item label="Số Điện Thoại" name="phone" rules={[{required: true,message: "Vui lòng nhập số điện thoại!"}]}>
                    <InputNumber
                      type="text"
                      defaultValue={store?.phone}
                      style={{
                        width: "100%",}}/>
                  </Form.Item>

                  <Form.Item label="Tải lên" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                      <div>
                        <PlusOutlined />
                        <div style={{marginTop: 8,}}>
                          Upload
                        </div>
                      </div>
                    </Upload>

                  </Form.Item>
                  <Form.Item className="float-end">
                    <button type='submit' className='form-button'>{store?.id ? "Cập Nhật" : "Đăng ký"}</button>
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