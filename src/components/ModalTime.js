
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Modal, Button, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/store-time/create"; 

const ModalTime = ({ open,  onCancel , reset}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [time, setTime] = useState([]);

    const getTime = async () => {
      try {
        const res = await axios.get("https://magpie-aware-lark.ngrok-free.app/api/v1/base/time", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            'ngrok-skip-browser-warning': 'true'
          },
        });
        if (res.status === 200) {
          setTime(res.data);
        }
      } catch (error) {
        console.error("Error in getTime:", error);
      }
    };

  useEffect(() => {
    getTime();
}, []);

const addNewTime = async (data) => {
    try {
      const res = await axios.post(`${URL}`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          'ngrok-skip-browser-warning': 'true'
        },
      });
      if (res.status === 200) {
        toast.success(`Created successfully`);
        navigate('/admin/manage-time');
        reset(); // Trigger a re-fetch of the data in the parent component
        onCancel();
      } else {
        console.error(`Unexpected response status: ${res.status}`);
        toast.error(`An error occurred while creating a new one.`);
      }
    } catch (error) {
      console.error("Error in addNewTime:", error);
      toast.error(`An error occurred while creating a new one.`);
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
        price: [
          { required: true, message: 'Required' },
          (formInstance) => ({
            message: 'Please enter price, minimum is 1',
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

        dateRange: [
          { required: true, message: 'Required' },
          (formInstance) => ({
            message: 'Please enter date range',
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
      };
    return (
        <Modal title="Add Washing Type" okText="Confirm"
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
                        addNewTime(values);
                          
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
                <Form.Item label="Price" name='price' rules={rules.price}>
                    <InputNumber min={1}/>
                </Form.Item>
                <Form.Item label="Date Range" name='dateRange' rules={rules.dateRange} >
                    <Input min={1} />
                </Form.Item>
                
                <Form.Item label="Time Category" name="timeCategoryId" rules={[{ required: true, message: 'Please Select!' }]}>
    <Select size='large' placeholder="Please Select">
        {time.map(item => (
            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
        ))}
    </Select>
</Form.Item>
</Form>
        </Modal>
        
    );
};

export default ModalTime;