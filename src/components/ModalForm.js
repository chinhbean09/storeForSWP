
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Modal, Button, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/standard-service/prices";

const ModalForm = ({ open,  onCancel , reset}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const addNewService = async (data) => {
      try {
          const res = await axios.post(`${URL}/create`, data, {
              headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  'ngrok-skip-browser-warning': 'true'
              },
          });
  
          if (res.status === 200) {
              toast.success(`Tạo mới thành công`);
              navigate('/admin/laundry');
              reset(); // Trigger a re-fetch of the data in the parent component
              onCancel();
          } else {
              // Handle unexpected response status here
              console.error(`Unexpected response status: ${res.status}`);
              toast.error(`An error occurred while creating a new one.`);

              // Optionally, display an error message to the user
              // toast.error(`Error creating new service. Please try again.`);
          }
      } catch (error) {
          // Handle network or other errors here
          console.error("Error in addNewService:", error);
          toast.error(`An error occurred while creating a new one.`);

          // Optionally, display an error message to the user
          // toast.error(`Error creating new service. Please try again.`);
      }
  };
  
    const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 12,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };


      const rules = {
        to: [
          { required: true, message: 'Required' },
          (formInstance) => ({
            message: 'Giá trị của của "Đến" không được nhỏ hơn hoặc bằng giá trị của "Từ"',
            validator(rule, value) {
              if (value === null) {
                return Promise.resolve();
              }
              const upperValue = formInstance.getFieldValue('from');
              console.log(upperValue)
              if (value <= upperValue) {
                return Promise.reject(new Error());
              }
              return Promise.resolve();
            },
          }),
        ],
        from: [{ required: true, message: 'Required' }],
      };


    return (


        <Modal title="Add new price" okText="Confirm"
            cancelText="Cancel"
            open={open}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        addNewService(values);
                       
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="horizontal"
            {...layout}
            name='newItem'
            initialValues={{
                modifier: 'public',
            }}>
                <Form.Item label="Từ" name='from' rules={rules.from}>
                    <InputNumber min={0}/>
                </Form.Item>
                <Form.Item label="Đến" name='to' rules={rules.to}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item label="Giá" name='price' rules={[{ required: true, message: `Vui lòng nhập dữ liệu !`}]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item label="Đơn vị tính" name="unit" rules={[{ required: true, message: 'Vui lòng nhập dữ liệu!' }]}>
    <Select >
        <Select.Option value="kg">kg</Select.Option>
    </Select>
</Form.Item>
            </Form>

        </Modal>


    );
};

export default ModalForm;