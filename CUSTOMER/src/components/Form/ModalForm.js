import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
const ModalForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Thay đổi mật khẩu"
      okText="Xác nhận"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        
                {/*Passwords------------------------------------------------------------------------------------------------------------*/}
                <Form.Item
                                    name="password"
                                    label="Mật khẩu mới"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password className="col-6"/>
                                </Form.Item>
                                {/*Confirm Passwords------------------------------------------------------------------------------------------------------------*/}
                                <Form.Item
                                    name="confirm"
                                    label="Xác nhận lại mật khẩu"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className="col-6"/>
                                </Form.Item>

                                {/*Button------------------------------------------------------------------------------------------------------------*/}
                               

      </Form>
    </Modal>
  );
};

export default ModalForm;