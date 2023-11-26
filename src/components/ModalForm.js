
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/standard-service/prices";


const ModalForm = ({ open,  onCancel , reset}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const addNewService = async (data) => {
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
         

        }
      }
    // const create =(data)=>{
    //     addNewService(data);
    // }
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
            message: 'The value of "To" cannot be less than or equal to the value of "From"',
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


        <Modal title=" Add new price" okText="Confirm"
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
                        reset();
                        onCancel();
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
                <Form.Item label="From" name='from' rules={rules.from}>
                    <InputNumber min={1}/>
                </Form.Item>
                <Form.Item label="To" name='to' rules={rules.to}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item label="Price" name='price' rules={[{ required: true, message: `Please enter data!`}]}>
                    <InputNumber min={1000} />
                </Form.Item>
                <Form.Item label="Unit" name='unit' rules={[{ required: true, message: `Please enter data!`, }]}>
                    <Input />
                </Form.Item>
            </Form>

        </Modal>


    );
};

export default ModalForm;