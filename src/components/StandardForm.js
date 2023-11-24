import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillStar } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { Checkbox, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableEditable from "./TableEditable";
import { useDispatch, useSelector } from "react-redux";
import { addNewStandardService, getStandardService, resetState} from "../features/product/productSlice";
import { base_url } from "../utils/baseUrl";

const { TextArea } = Input;

const error_init = {
  name_err: '',
  price_err: '',
  description_err: '',
  image_err: '',
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/standard-service";

const StandardDetailForm = () => {
  const { userInfoDTO } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(resetState())
    dispatch(getStandardService(userInfoDTO.id));

  }, [dispatch]);

  const { standardService, isSuccess } = useSelector((state) => state.product);

  const [errors, setErrors] = useState(error_init);

  const updateStandardService = async (id, data) => {
    const res = await axios.put(`${base_url}store/standard-service/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    if (res.status === 200) {
      console.log(res.data);
      toast.success(`Updated Product with ID: ${id} successfully ~`);
      navigate('/admin/laundry');
    }
  }

  const handleSubmit = (event) => {
    form
      .validateFields()
      .then((values) => {
        if (standardService?.id !== undefined) {

          updateStandardService(standardService?.id, values);
        }

        else {
          dispatch(addNewStandardService(values));
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  const [componentDisabled, setComponentDisabled] = useState(true);


  function starRating(params) {
    const stars = [];
    for (let index = 0; index < params; index++) {
      stars.push(<AiFillStar className='checked' key={index} />);
    }
    return stars;
  }

  function generateCurrency(params) {
    return params.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }


  return (
    <Wrapper>

      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8">
         
            <div class="card mb-4">
              <div class="card-body">
                <h2>{standardService?.id ? "Cập nhật thông tin dịch vụ" : "Tạo mới dịch vụ tiêu chuẩn"}</h2>
                <Checkbox
                  checked={componentDisabled}
                  onChange={(e) => setComponentDisabled(e.target.checked)}
                >
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
                  initialValues={{
                    name: standardService?.name,
                    description: standardService?.description
                  }}

                >
                  <Form.Item label="Name" name='name' rules={[{ required: true, message: `Vui lòng nhập dữ liệu !` }]}>
                    <Input defaultValue={standardService?.name} ></Input>
                    {/* {errors.name_err && <span className='error'>{errors.name_err}</span>} */}
                  </Form.Item>
                  <Form.Item label="Description" name='description' rules={[{ required: true, message: `Vui lòng nhập dữ liệu !` }]} >
                    <TextArea rows={4} defaultValue={standardService?.description} />
                    {/* {errors.description_err && <span className='error'>{errors.description_err}</span>} */}
                  </Form.Item>
                  <Form.Item label="Tải lên" valuePropName="fileList">
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
                    <button type='submit' className='form-button'>{standardService?.id ? "Update" : "Submit"}</button>
                  </Form.Item>

                </Form>
              </div>
            </div>

            {standardService?.id ? (<><h3 className="px-5 fw-bold">Bảng Giá : </h3>
              <TableEditable /></>) : ""}

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

export default StandardDetailForm;